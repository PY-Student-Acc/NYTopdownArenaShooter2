import { EnemyInputSystem } from "./EnemyInputSystem";

export interface Istate {
    enter(brain: EnemyInputSystem): void
    execute(brain: EnemyInputSystem, dt: number): void
    exit(brain: EnemyInputSystem):void
}


