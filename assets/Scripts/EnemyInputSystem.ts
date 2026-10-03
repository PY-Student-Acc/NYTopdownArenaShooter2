import { _decorator, Component, math, Node, RigidBody2D, Vec2 } from 'cc';
import { EnemyMovementSystem } from './EnemyMovementSystem';
import { HealthSystem } from './HealthSystem';
import { SeekBehavior } from './SeekBehavior';
import { IInputSystem } from './IInputSystem';
const { ccclass, property } = _decorator;

@ccclass('EnemyInputSystem')
export class EnemyInputSystem extends Component /*implements IInputSystem*/{

    private maxSpeed: number | null = null
    private maxTurnForce: number | null = null
    private rigidBody: RigidBody2D | null = null

    protected onLoad(): void {
        this.rigidBody = this.getComponent(RigidBody2D)
        this.maxSpeed = 4
        this.maxTurnForce = 0.2
    }

    public updateRotation(angleDegrees: number | null) {
        if (angleDegrees !== null) {
            this.node.angle = angleDegrees
        }
        else {
            let currentVelocity = this.getVelocity()
            if (currentVelocity.lengthSqr() > 0.01) {
                this.node.angle = math.toDegree(Math.atan2(currentVelocity.y, currentVelocity.x))
            }
        }
    }


    public getVelocity(): Vec2 {
        return this.rigidBody ? this.rigidBody.linearVelocity.clone() : Vec2.ZERO
    }

    public updateMovement(moveDir: Vec2) {
        if (!this.rigidBody) return

        let currentVelocity = this.getVelocity()

        let desiredVelocity = new Vec2
        Vec2.multiplyScalar(desiredVelocity, moveDir, this.maxSpeed)

        let steeringForce = new Vec2
        Vec2.subtract(steeringForce, desiredVelocity, currentVelocity)
        steeringForce = this.clampForce(steeringForce, this.maxTurnForce)


        currentVelocity.add(steeringForce)

        currentVelocity = this.clampForce(currentVelocity, this.maxSpeed)

        this.rigidBody.linearVelocity = currentVelocity
    }

    private clampForce(force: Vec2, maxForce: number): Vec2 {

        if (force.lengthSqr() > (maxForce ** 2)) {
            force.normalize().multiplyScalar(maxForce)
        }
        return force
    }





    
    private seek: SeekBehavior = new SeekBehavior()
    private targetNode: Node | null = null

    public initialize(targetNode: Node){
        this.targetNode = targetNode
    }

    public getMoveDirection(): Vec2 {
        if (!this.targetNode) return Vec2.ZERO
        
        let currentPos = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y)
        let targetPos = new Vec2(this.targetNode.worldPosition.x, this.targetNode.worldPosition.y)

        return this.seek.getDesiredVelocity(currentPos, targetPos)
    }

    public getRotationAngle(): number {
        return null
    }
    
}


