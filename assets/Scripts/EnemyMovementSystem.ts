import { _decorator, Component, Node, RigidBody2D, Vec2 } from 'cc';
import { EnemyInputSystem } from './EnemyInputSystem';
import { HealthSystem } from './HealthSystem';
const { ccclass, property } = _decorator;

@ccclass('EnemyMovementSystem')
export class EnemyMovementSystem extends Component {

    @property
    public speed: number = 10

    private rigidBody: RigidBody2D | null = null

    protected onLoad(): void {
        this.rigidBody = this.getComponent(RigidBody2D)
    }

    public updateRotation(angleDegrees: number | null): void {
        if (angleDegrees != null) {
            this.node.angle = angleDegrees
        }
    }
    public updateMovement(moveDir: Vec2): void{
        if (!this.rigidBody) return

        let currentVelocity = new Vec2
        Vec2.multiplyScalar(currentVelocity, moveDir, this.speed)

        this.rigidBody.linearVelocity = currentVelocity
    }
    
}


