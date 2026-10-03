import { _decorator, Component, Node } from 'cc';
import { EnemyMovementSystem } from './EnemyMovementSystem';
import { HealthSystem } from './HealthSystem';
const { ccclass, property } = _decorator;

@ccclass('EnemyInputSystem')
export class EnemyInputSystem extends Component {
    
    private inputSystem: EnemyInputSystem | null = null;
    private movementSystem: EnemyMovementSystem | null = null
    private healthSystem: HealthSystem | null = null

    protected onLoad(): void {
        this.inputSystem = this.getComponent(EnemyInputSystem)
        this.movementSystem = this.getComponent(EnemyMovementSystem)
        this.healthSystem = this.getComponent(HealthSystem)

        if (this.healthSystem) {
            this.healthSystem.initialize(20)
        }
    }
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


