import { _decorator, Component, Label, math, Node, RigidBody2D, Vec2 } from 'cc';
import { EnemyMovementSystem } from './EnemyMovementSystem';
import { HealthSystem } from './HealthSystem';
import { SeekBehavior } from './SeekBehavior';
import { IInputSystem } from './IInputSystem';
import { WanderBehavior } from './WanderBehavior';
import { Istate } from './Istate';
import { PatrolState } from './PatrolState';
import { ArrivedState } from './ArrivedState';
import { ChaseState } from './ChaseState';
import { LostPlayerState } from './LostPlayerState';
const { ccclass, property } = _decorator;

@ccclass('EnemyInputSystem')
export class EnemyInputSystem extends Component /*implements IInputSystem*/{
 /*
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
    */

    

    @property ({ type: Label})
    public stateDebugLabel: Label | null = null

    
    public seek: SeekBehavior = new SeekBehavior()
    public wander: WanderBehavior = new WanderBehavior()
    public targetNode: Node | null = null

    public patrolState: PatrolState = new PatrolState()
    public arrivedState: ArrivedState = new ArrivedState()
    public chaseState: ChaseState = new ChaseState()
    public lostPlayerState: LostPlayerState = new LostPlayerState()

    public spotPlayerDistance: number = 200
    public losePlayerDistance: number = 250

    private currentState: Istate | null = null
    private currentMoveDir: Vec2 = new Vec2

    public initialize(targetNode: Node, wayPoints: Vec2[]){
        this.targetNode = targetNode
        this.wander.setWayPoints(wayPoints)

        this.changeState(this.patrolState)
    }

    public changeState(newState: Istate) {
        if (this.currentState && this.currentState != newState) {
            this.currentState.exit(this)
        }
        if (this.currentState != newState) {
            this.currentState = newState
            this.currentState.enter(this)

            if (this.stateDebugLabel) {
                this.stateDebugLabel.string = newState.constructor.name
            }
        }
    }

    public processFSM(dt: number) {
        if (this.changeState) {
            this.currentState.execute(this, dt)
        }
    }

    public setMoveDirection(dir: Vec2) {
        this.currentMoveDir = dir
    }

    public getMoveDirection(): Vec2 {
        return this.currentMoveDir
    }

    public getRotationAngle(): number {
        return null
    }

    public getDistanceToPlayer(myPos: Vec2): number {
        if(!this.targetNode) return Infinity

        let playerPos = this.getPlayerPos()
        return Vec2.distance(myPos, playerPos)
    }
    
    public getPlayerPos(): Vec2 {
        return new Vec2 (
            this.targetNode.worldPosition.x, this.targetNode.worldPosition.y
        )
    }
}


