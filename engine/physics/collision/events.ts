//onCollisionEnter/Exit logic, hooks for gameplay.

import { Shape } from "./detection.js";

type CollisionEventType = "enter" | "exit" | "stay";

type CollisionEventCallbackType = (
  entity1: Shape,
  entity2: Shape
) => {
  entity1: Partial<Shape>;
  entity2: Partial<Shape>;
};

type CollisionEventRegistry = {
  [key in CollisionEventType]: CollisionEventCallbackType[];
};

export class CollisionEvents {
  private entity: Shape;
  private eventRegistry: CollisionEventRegistry;
  constructor(entity: Shape) {
    this.entity = entity;
    this.eventRegistry = {
      enter: [],
      exit: [],
      stay: [],
    };
  }
  addEventListener(event: CollisionEventType, callback: CollisionEventCallbackType) {
    this.eventRegistry[event].push(callback);
  }
  removeEventListener(event: CollisionEventType, callback: CollisionEventCallbackType) {
    const callbacks = this.eventRegistry[event];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
  triggerEvent(event: CollisionEventType, otherEntity: Shape): Partial<Shape>{
    const callbacks = this.eventRegistry[event];
    let updatedState: Partial<Shape> = {};

    for(const callback of callbacks){
        const result = callback(this.entity, otherEntity);
        updatedState = {...updatedState, ...result.entity1}
    }
    return updatedState;
  }
  onCollisionEnter(event: CollisionEventType, callback: CollisionEventCallbackType) {
    // Assume that collision is detected/not detected and then the collision events are called for entity state updates
    return this.addEventListener("enter", callback);
  }
  onCollisionExit(event: CollisionEventType, callback: CollisionEventCallbackType){
    return this.addEventListener("exit", callback);
  }
  onCollisionStay(event: CollisionEventType, callback: CollisionEventCallbackType){
    return this.addEventListener("stay", callback);
  }
}
