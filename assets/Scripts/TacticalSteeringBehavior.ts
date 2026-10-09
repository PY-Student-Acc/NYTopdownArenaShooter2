import { math, Vec2 } from "cc";
import { MovementConfig } from "./EnemyConfig";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { AvoidBehavior } from "./AvoidBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {
    
    private movementConfig: MovementConfig
    private currentHitNormals: Vec2[] = []
    private brain: EnemyMovementSystem
    private avoidBehavior: AvoidBehavior

    constructor(movementConfig: MovementConfig, EnemyMovementSystem: EnemyMovementSystem) {
        this.movementConfig = movementConfig
        this.brain = EnemyMovementSystem
        this.avoidBehavior = new AvoidBehavior(EnemyMovementSystem, movementConfig.whiskers)
    }
    getDesiredVelocity(currentPosition: math.Vec2, targetPostion?: Readonly<math.Vec2>): math.Vec2 {
        
        let totalTactiaclForce = new Vec2

        if (this.movementConfig.avoidWeight > 0) {
            let avoidForce = this.avoidBehavior.getDesiredVelocity(currentPosition)

            avoidForce.multiplyScalar(this.movementConfig.avoidWeight)
            totalTactiaclForce.add(avoidForce)
        }

        if (this.movementConfig.flocking.separationWeight > 0) {

        }

        if (this.movementConfig.flocking.alignmentWeight > 0) {
            
        }

        if (this.movementConfig.flocking.cohesionWeight > 0) {
            
        }

        if (totalTactiaclForce.lengthSqr() > 1.0) {
            totalTactiaclForce.normalize()
        }

        return totalTactiaclForce
    }
}


