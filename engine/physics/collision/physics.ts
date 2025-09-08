import { collidableObjectType } from "../../collision.js"
class PhysicsWorld {
    private collsionObjects: collidableObjectType[];
    private GRAVITY: number = -9.81;
    constructor(collisionObjects: collidableObjectType[]){
        this.collsionObjects = collisionObjects
    }
    step(dt: number){
        for(let x in this.collsionObjects){
            this.collsionObjects[x].force.y += this.collsionObjects[x].mass * this.GRAVITY;
            this.collsionObjects[x].velocity.x += this.collsionObjects[x].force.x / this.collsionObjects[x].mass * dt;
            this.collsionObjects[x].velocity.y += this.collsionObjects[x].force.y / this.collsionObjects[x].mass * dt;
            this.collsionObjects[x].position.x += this.collsionObjects[x].velocity.x * dt;
            this.collsionObjects[x].position.y += this.collsionObjects[x].velocity.y * dt;

            this.collsionObjects[x].force.x = 0;
            this.collsionObjects[x].force.y = 0;
        }
    }
}

