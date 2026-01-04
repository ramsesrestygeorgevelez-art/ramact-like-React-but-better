// -----------------------------
// Types
// -----------------------------

/**
 * Basic stats for a PlayexCharacter.
 */
export type CharacterStats = {
  /** Current health points of the character */
  health: number;
  /** Stamina points used for movement or special actions */
  stamina: number;
  /** Strength value used to calculate attack damage */
  strength: number;
  /** Defense value used to reduce incoming damage */
  defense: number;
};

/**
 * Position in a 2D coordinate system.
 */
export type Position = {
  /** Horizontal coordinate */
  x: number;
  /** Vertical coordinate */
  y: number;
};

// -----------------------------
// PlayexCharacter Class
// -----------------------------

/**
 * Represents a character in the Playex system.
 * Characters have stats, a position, and can perform actions
 * such as moving, attacking, taking damage, and healing.
 */
export class PlayexCharacter {
  /** Unique name of the character */
  name: string;
  /** Combat and survival stats */
  stats: CharacterStats;
  /** Current position in the world */
  position: Position;
  /** Whether the character is alive */
  isAlive: boolean;

  /**
   * Creates a new PlayexCharacter.
   * @param name - The character's name.
   * @param stats - Partial stats to override defaults.
   * @param position - Starting position (default is {x:0, y:0}).
   */
  constructor(
    name: string,
    stats: Partial<CharacterStats> = {},
    position: Position = { x: 0, y: 0 }
  ) {
    this.name = name;
    this.stats = {
      health: stats.health ?? 100,
      stamina: stats.stamina ?? 50,
      strength: stats.strength ?? 10,
      defense: stats.defense ?? 5,
    };
    this.position = position;
    this.isAlive = true;
  }

  /**
   * Moves the character by a delta in x and y.
   * @param dx - Change in x coordinate.
   * @param dy - Change in y coordinate.
   */
  move(dx: number, dy: number) {
    this.position.x += dx;
    this.position.y += dy;
  }

  /**
   * Applies damage to the character, reduced by defense.
   * @param amount - Raw damage amount.
   */
  takeDamage(amount: number) {
    const reduced = Math.max(amount - this.stats.defense, 0);
    this.stats.health -= reduced;
    if (this.stats.health <= 0) this.isAlive = false;
  }

  /**
   * Attacks another character, dealing damage equal to strength.
   * @param target - The character to attack.
   */
  attack(target: PlayexCharacter) {
    if (!this.isAlive) return;
    target.takeDamage(this.stats.strength);
  }

  /**
   * Heals the character by a given amount.
   * @param amount - Amount of health to restore.
   */
  heal(amount: number) {
    if (!this.isAlive) return;
    this.stats.health += amount;
  }
}

// -----------------------------
// PlayexEngine Class
// -----------------------------

/**
 * Central registry for PlayexCharacters.
 * Manages adding, retrieving, and listing characters.
 */
export class PlayexEngine {
  private characters: Map<string, PlayexCharacter>;

  /**
   * Creates a new PlayexEngine with an empty character registry.
   */
  constructor() {
    this.characters = new Map();
  }

  /**
   * Registers a character in the engine.
   * @param character - The character to register.
   */
  registerCharacter(character: PlayexCharacter) {
    this.characters.set(character.name, character);
  }

  /**
   * Retrieves a character by name.
   * @param name - The character's name.
   * @returns The character if found, otherwise undefined.
   */
  getCharacter(name: string): PlayexCharacter | undefined {
    return this.characters.get(name);
  }

  /**
   * Lists all registered character names.
   * @returns Array of character names.
   */
  listCharacters(): string[] {
    return Array.from(this.characters.keys());
  }
}

// -----------------------------
// PlayexExecutor Class
// -----------------------------

/**
 * Executes actions and battles using the PlayexEngine.
 * Provides methods for running combat and scripted sequences.
 */
export class PlayexExecutor {
  private engine: PlayexEngine;

  /**
   * Creates a new PlayexExecutor bound to a PlayexEngine.
   * @param engine - The engine instance to use.
   */
  constructor(engine: PlayexEngine) {
    this.engine = engine;
  }

  /**
   * Executes a simple battle between two characters until one is defeated.
   * @param attackerName - Name of the attacking character.
   * @param defenderName - Name of the defending character.
   */
  executeBattle(attackerName: string, defenderName: string) {
    const attacker = this.engine.getCharacter(attackerName);
    const defender = this.engine.getCharacter(defenderName);
    if (!attacker || !defender) throw new Error("Both characters must exist in the engine.");

    while (attacker.isAlive && defender.isAlive) {
      attacker.attack(defender);
      if (!defender.isAlive) break;
      defender.attack(attacker);
    }
  }

  /**
   * Executes a scripted sequence of actions for characters.
   * @param actions - Array of action objects describing moves, attacks, or heals.
   */
  executeScript(
    actions: { type: "move" | "attack" | "heal"; actor: string; target?: string; value?: number }[]
  ) {
    for (const action of actions) {
      const actor = this.engine.getCharacter(action.actor);
      const target = action.target ? this.engine.getCharacter(action.target) : undefined;
      if (!actor) continue;

      switch (action.type) {
        case "move":
          actor.move(action.value ?? 0, action.value ?? 0);
          break;
        case "attack":
          if (target) actor.attack(target);
          break;
        case "heal":
          actor.heal(action.value ?? 10);
          break;
      }
    }
  }
}
