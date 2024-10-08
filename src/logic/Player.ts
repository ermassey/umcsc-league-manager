/**
 * Represents the stored properties of players when they are saved.
 * 
 * @see Player
 */

interface IPlayer {
    id: number;
    name: string;
    startingelo: number;
    member: MembershipType;
    ap3: boolean;
    played: number;
    wins: number;
    gamessincebye: number;
}

/**
* Represents whether a player is currently participating in the week
*/
enum PlayingState {
    PLAYING,
    AWAY,
    NOTPLAYING
}

/**
 * Represents the membership a member has
 */
enum MembershipType {
    NONE = "none",
    MEMBER = "member",
    ALUMNI = "alumni"
}


/** 
 * Represents a player.
 */
class Player {
    id: number;
    name: string;
    member: MembershipType;
    ap3: boolean;
    paid: boolean;

    startingelo: number;
    currentelo: number;
    elochange: number = 0;

    played: number;
    wins: number;
    gamessincebye: number;

    inrounds: boolean[];
    byes: (boolean | null)[];
    seed: number;
    playingState: PlayingState = PlayingState.NOTPLAYING;

    /**
     * @constructor
     * Creates a new player.
     * 
     * @param id - Player ID, unique, remains constant once assigned
     * @param name - The name of the player
     * @param member - The membership type of a player (either none, member, or alumni)
     * @param startingelo - The players starting ELO at the beginning of the night
     * @param currentround - The current round. If later in the week, inround and null need to
     * be adjusted to ensure they are consistant with all other players
     */

    constructor(
        id: number,
        name: string,
        member: MembershipType,
        ap3: boolean,
        startingelo: number,
        played?: number,
        wins?: number,
        gamessincebye?: number,
        currentround?: number) {
    
        this.id = id;
        this.name = name;
        this.startingelo = startingelo;
        this.currentelo = this.startingelo;
        this.elochange = 0;

        this.ap3 = ap3;
        this.member = member;
        this.paid = false;

        this.played = 0;
        this.wins = 0;
        this.gamessincebye = 0;

        this.seed = Math.floor(Math.random() * 1000) // Randomly generated per week, used for game ordering

        this.inrounds = [];
        this.byes = [];

        this.played = played !== undefined ? played : 0;
        this.wins = wins !== undefined ? wins : 0;
        this.gamessincebye = gamessincebye !== undefined ? gamessincebye : 0;

        // If currentround is specified, ensure inrounds and byes are set correctly
        if (currentround != null) {
            for (var i = 0; i < currentround; i++) {
                this.inrounds.push(false);
                this.byes.push(null);
            }
        }
    }

    /**
     * Creates a player object from parsed JSON.
     * 
     * @param jsonObj Player interface from the parsed JSON.
     * @param currentround - The current round (see above)
     * @returns Player, with the required attributes
     */
    static fromJSON(jsonObj: IPlayer, currentround?: number): Player {
        if (typeof(currentround) != "undefined") {
            return new Player(jsonObj.id, jsonObj.name, jsonObj.member as MembershipType,
                jsonObj.ap3, jsonObj.startingelo, jsonObj.played, jsonObj.wins,
                jsonObj.gamessincebye, currentround);
        } else {
            return new Player(jsonObj.id, jsonObj.name, jsonObj.member as MembershipType,
                jsonObj.ap3, jsonObj.startingelo, jsonObj.played, jsonObj.wins,
                jsonObj.gamessincebye);
        }
    }
}

export {Player, PlayingState, MembershipType}
export type {IPlayer}