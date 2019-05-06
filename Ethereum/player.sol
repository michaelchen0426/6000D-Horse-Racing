pragma solidity >=0.4.22 <0.6.0;

contract HorseRacing {

    struct RaceBet {
        uint raceId;
        uint playerId;
        uint amount;
        uint256 timestamp;
    }

    address payable player;
    uint index;
    address payable private hoster = 0x856a50f6AEff7745173E5bCEE935C2839B1f9954;
    mapping(uint => RaceBet) public bettings;

    /// Create a new ballot with $(_numProposals) different proposals.
    constructor() public payable {
        player = msg.sender;
        index = 0;
    }
    
    function bet(uint raceId, uint playerid, uint256 timestamp) public payable {
        address addr = msg.sender;
        //Only player can bet
        require(addr == player);
        require(
            now <= timestamp,
            "Racing already ended."
        );
        
        uint accountBalance = addr.balance;
        require(accountBalance > msg.value);
        
        bettings[index] = RaceBet(raceId, playerid, msg.value, timestamp);
        index = index + 1;
        hoster.transfer(msg.value);
    }
    
    function payAll() public payable {
        hoster.transfer(address(this).balance);
    }
    
    function getContractBalance() public view returns(uint balanace) {
        return address(this).balance;
    }
    
    function getAddressThis() public view returns(address addr) {
        return address(this);
    }
    
    function getPlayerBalance() public view returns(uint balance) {
        return player.balance;
    }
    function getBetsCount() public view returns(uint count) {
        return index;
    }
    
    function getHosterAddress() public view returns(address addr) {
        return hoster;
    }
    
    function getPlayerAddress() public view returns(address addr) {
        return player;
    }
    
    function closeContract() public {
        if (msg.sender != hoster) return;
        selfdestruct(player);
    }
}
