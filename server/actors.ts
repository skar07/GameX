type PlayerType = {
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
  position: {};
  type: string;
  avatar: string;

  constructor({ position = { x: 0, y: 0 }, type, avatar }: PlayerType) {
    this.position = position;
    this.type = type;
    this.avatar = avatar;
  }
  getPosition() {
    return this.position;
  }
  setPosition(newPosition: PlayerType["position"]) {
    return (this.position = newPosition);
  }
}

class PlayerEntity extends Player<PlayerEntityType> {
  clothing: PlayerEntityType["clothing"];
  inventory: PlayerEntityType["inventory"];
  actions: PlayerEntityType["actions"];
  private constructor(
    { position, type, avatar }: PlayerType,
    clothing: PlayerEntityType["clothing"],
    inventory: PlayerEntityType["inventory"],
    actions: PlayerEntityType["actions"]
  ) {
    super({ position, type, avatar });
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
