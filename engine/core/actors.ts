import { EntityMovement, MovementType } from "../physics/movement.js";

export type PlayerType = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  type: string;
  avatar: string;
};

type actionType = "jump" | "laugh" | "wave" | "dance";

type PlayerEntityType = PlayerType & {
  clothing: "robes" | "formal" | "casual";
  inventory: Map<string, number>;
  actions: Record<keyof actionType, () => object>;
};
class Player<T extends PlayerType> {
  id: string;
  position: { x: number; y: number };
  type: string;
  avatar: string;
  playerMovement = new EntityMovement();
  constructor({ id, position = { x: 0, y: 0 }, type, avatar }: PlayerType) {
    this.id = id;
    this.position = position;
    this.type = type;
    this.avatar = avatar;
  }
  getPlayerId() {
    return this.id;
  }
  setPlayerId(id: string) {
    return (this.id = id);
  }
  getPosition() {
    return this.position;
  }
  setPosition(newPosition: PlayerType["position"]) {
    return (this.position = newPosition);
  }
  handlePlayerMovement(direction: MovementType) {
    return this.playerMovement.executeTransition(direction, this.position)
  }
}

export class PlayerEntity extends Player<PlayerEntityType> {
  clothing: PlayerEntityType["clothing"];
  inventory: PlayerEntityType["inventory"];
  actions: PlayerEntityType["actions"];
  protected constructor(
    { id, position, type, avatar }: PlayerType,
    clothing: PlayerEntityType["clothing"],
    inventory: PlayerEntityType["inventory"],
    actions: PlayerEntityType["actions"]
  ) {
    super({ id, position, type, avatar });
    this.clothing = clothing;
    this.inventory = inventory;
    this.actions = actions;
  }
  getClothing() {
    return this.clothing;
  }
  getInventory() {
    return this.inventory;
  }
  setClothing(newClothing: PlayerEntityType["clothing"]) {
    return (this.clothing = newClothing);
  }
  addToInventory(item: string, itemAmount: number) {
    return this.inventory.set(item, itemAmount);
  }
  removeFromInventory(item: string, amountToRemove: number) {
    if (this.inventory.has(item)) {
      const currentAmount: number = this.inventory.get(item)!;
      currentAmount > amountToRemove
        ? this.inventory.set(item, currentAmount - amountToRemove)
        : this.inventory.delete(item);
    }
  }
}

class PlayerManager extends PlayerEntity {
  allPlayers: Map<string, PlayerEntity>;
  constructor(props: PlayerEntityType, allPlayers: Map<string, PlayerEntity>) {
    super(props, props.clothing, props.inventory, props.actions);
    this.allPlayers = allPlayers;
  }
  getAllPlayers() {
    return this.allPlayers;
  }
  setAllPlayesr(newAllPlayers: Map<string, PlayerEntity>) {
    // useful for moving players from one map to another, say map level progress like in Roblox
    return (this.allPlayers = newAllPlayers);
  }
  createPlayer(props: PlayerEntityType) {
    if (!this.allPlayers.has(props.id)) {
      const newPlayer = new PlayerEntity(
        props,
        props.clothing,
        props.inventory,
        props.actions
      );
      this.allPlayers.set(newPlayer.id, newPlayer);
    }
  }
  addPlayer(newPlayer: PlayerEntity) {
    return this.allPlayers.set(newPlayer.id, newPlayer);
  }
  removePlayer(playerToRemove: PlayerEntity) {
    return this.allPlayers.delete(playerToRemove.id);
  }
  removeAllPlayers() {
    this.allPlayers.clear();
    return JSON.stringify({ message: `All players removed` });
  }
}
