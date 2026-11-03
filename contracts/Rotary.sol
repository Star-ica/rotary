// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Rotary - on-chain rotating savings group (Ajo / Esusu) using native BOT.
contract Rotary {
    enum Status { Open, Active, Completed }

    struct Group {
        address creator;
        uint256 contribution;
        uint64 interval;
        uint8 maxMembers;
        Status status;
        uint8 round;
        uint64 startTime;
    }
    Group[] public groups;
    mapping(uint256 => address[]) private _members;
    mapping(uint256 => mapping(address => bool)) public isMember;
    mapping(uint256 => mapping(address => uint256)) public deposits;
    mapping(uint256 => mapping(address => uint8)) public defaults;
    mapping(uint256 => mapping(uint8 => mapping(address => bool))) public contributed;
    mapping(uint256 => mapping(uint8 => uint8)) public paidCount;

    event GroupCreated(uint256 indexed id, address indexed creator, uint256 contribution, uint64 interval, uint8 maxMembers);
    event Joined(uint256 indexed id, address indexed member);
    event Started(uint256 indexed id);
    event Contributed(uint256 indexed id, uint8 round, address indexed member);
    event PaidOut(uint256 indexed id, uint8 round, address indexed recipient, uint256 amount);

    function groupCount() external view returns (uint256) { return groups.length; }
    function getMembers(uint256 id) external view returns (address[] memory) { return _members[id]; }
    function hasContributed(uint256 id, address a) external view returns (bool) { return contributed[id][groups[id].round][a]; }
    function roundDeadline(uint256 id) public view returns (uint256) {
        Group memory g = groups[id];
        return uint256(g.startTime) + uint256(g.interval) * (uint256(g.round) + 1);
    }

    function createGroup(uint256 contribution, uint64 interval, uint8 maxMembers) external payable returns (uint256 id) {
        require(contribution > 0 && interval > 0 && maxMembers >= 2 && maxMembers <= 20, "bad params");
        groups.push(Group(msg.sender, contribution, interval, maxMembers, Status.Open, 0, 0));
        id = groups.length - 1;
        emit GroupCreated(id, msg.sender, contribution, interval, maxMembers);
        _join(id, msg.sender);
    }

    function join(uint256 id) external payable { _join(id, msg.sender); }

    function _join(uint256 id, address u) internal {
        Group storage g = groups[id];
        require(g.status == Status.Open, "not open");
        require(!isMember[id][u], "already a member");
        require(_members[id].length < g.maxMembers, "group full");
        require(msg.value == g.contribution, "wrong deposit");
        isMember[id][u] = true;
        deposits[id][u] = g.contribution;
        _members[id].push(u);
        emit Joined(id, u);
        if (_members[id].length == g.maxMembers) _start(id);
    }

    function start(uint256 id) external {
        Group storage g = groups[id];
        require(msg.sender == g.creator, "creator only");
        require(g.status == Status.Open, "not open");
        require(_members[id].length >= 2, "need 2+ members");
        _start(id);
    }

    function _start(uint256 id) internal {
        Group storage g = groups[id];
        g.maxMembers = uint8(_members[id].length);
        g.status = Status.Active;
        g.startTime = uint64(block.timestamp);
        emit Started(id);
    }

    function leave(uint256 id) external {
        Group storage g = groups[id];
        require(g.status == Status.Open && isMember[id][msg.sender] && msg.sender != g.creator, "cannot leave");
        address[] storage m = _members[id];
        for (uint256 i; i < m.length; i++) {
            if (m[i] == msg.sender) { m[i] = m[m.length - 1]; m.pop(); break; }
        }
        isMember[id][msg.sender] = false;
        uint256 d = deposits[id][msg.sender];
        deposits[id][msg.sender] = 0;
        (bool ok,) = msg.sender.call{value: d}("");
        require(ok, "refund");
    }

    function contribute(uint256 id) external payable {
        Group storage g = groups[id];
        require(g.status == Status.Active, "not active");
        require(isMember[id][msg.sender], "not a member");
        uint8 r = g.round;
        require(!contributed[id][r][msg.sender], "already paid this round");
        require(msg.value == g.contribution, "wrong amount");
        contributed[id][r][msg.sender] = true;
        paidCount[id][r]++;
        emit Contributed(id, r, msg.sender);
    }

    function payout(uint256 id) external {
        Group storage g = groups[id];
        require(g.status == Status.Active, "not active");
        address[] storage m = _members[id];
        uint8 r = g.round;
        require(paidCount[id][r] == m.length || block.timestamp >= roundDeadline(id), "round not finished");
        uint256 pot;
        for (uint256 i; i < m.length; i++) {
            address a = m[i];
            if (contributed[id][r][a]) {
                pot += g.contribution;
            } else {
                uint256 cover = deposits[id][a] < g.contribution ? deposits[id][a] : g.contribution;
                deposits[id][a] -= cover;
                pot += cover;
                defaults[id][a]++;
            }
        }
        address to = m[r];
        g.round = r + 1;
        if (g.round == m.length) g.status = Status.Completed;
        (bool ok,) = to.call{value: pot}("");
        require(ok, "transfer");
        emit PaidOut(id, r, to, pot);
    }

    function withdrawDeposit(uint256 id) external {
        require(groups[id].status == Status.Completed, "group not completed");
        uint256 d = deposits[id][msg.sender];
        require(d > 0, "nothing to withdraw");
        deposits[id][msg.sender] = 0;
        (bool ok,) = msg.sender.call{value: d}("");
        require(ok, "transfer");
    }
}