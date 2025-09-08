export type MovementType = "up" | "down" | "right" | "left"


type StateTransitions = {
    up : "right" | "left";
    down: "right" | "left";
    right: "up" | "down";
    left: "up" | "down";
}


type MovementFSM<T extends keyof StateTransitions> = {
    [K in StateTransitions[T]]: () => void;
}
type AnyMovementFSM = MovementFSM<"up"> | MovementFSM<"down"> | MovementFSM<"left"> | MovementFSM<"right">;

export class EntityMovement {
    private currentState: MovementType = "up"
    getAvailableTransitions(position: {x:number, y: number}): AnyMovementFSM   {
        switch(this.currentState){
            case "up": 
                return {
                    right: () => this.moveTo("right", position),
                    left: () => this.moveTo("left", position)
                } as MovementFSM<"up">;
            case "down": 
                return {
                    right: () => this.moveTo("right", position),
                    left: () => this.moveTo("left", position)
                } as MovementFSM<"down">
            case "left":
                return {
                    up: () => this.moveTo("up", position),
                    down: () => this.moveTo("down", position)
                } as MovementFSM<"left">
            case "right":
                return {
                    up: () => this.moveTo("up", position),
                    down: () => this.moveTo("down", position)
                } as MovementFSM<"right">
            
        }
    }
    private moveTo(movement: string, position: {x: number, y: number}){
        switch(movement){
            case "right":
                return position.x += 10;
            case "left":
                return position.x -= 10;
            case "up":
                return position.y += 10;
            case "down":
                return position.y -=10;
        }
    }
    executeTransition(requestedDirection: MovementType, position: {x: number, y: number}){
        const availableTransitions = this.getAvailableTransitions(position);
        if(requestedDirection in availableTransitions){
            (availableTransitions as any)[requestedDirection]();
            return true;
        }
        return false;
    }
}