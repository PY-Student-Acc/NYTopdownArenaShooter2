import { math, Vec2 } from "cc";
import { MovementConfig } from "./EnemyConfig";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { AvoidBehavior } from "./AvoidBehavior";
import { SeperationBehavior } from "./SeparationBehavior";
import { AlignmentBehavior } from "./AlignmentBehavior";
import { CohesionBehavior } from "./CohesionBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {
    
    private movementConfig: MovementConfig
    private currentHitNormals: Vec2[] = []
    private brain: EnemyMovementSystem
    private avoidBehavior: AvoidBehavior
    private separationBehavior: SeperationBehavior
    private alignmentBehavior: AlignmentBehavior
    private cohesionBehavior: CohesionBehavior

    constructor(movementConfig: MovementConfig, enemyMovementSystem: EnemyMovementSystem) {
        this.movementConfig = movementConfig
        this.brain = enemyMovementSystem
        this.avoidBehavior = new AvoidBehavior(enemyMovementSystem, movementConfig.whiskers)
        this.separationBehavior = new SeperationBehavior(enemyMovementSystem, movementConfig.flocking.separationRadius)
        this.alignmentBehavior = new AlignmentBehavior(enemyMovementSystem, movementConfig.flocking.alignmentRadius)
        this.cohesionBehavior = new CohesionBehavior(enemyMovementSystem, movementConfig.flocking.cohesionRadius)
    }
    getDesiredVelocity(currentPosition: math.Vec2, targetPostion?: Readonly<math.Vec2>): math.Vec2 {
        
        let totalTactiaclForce = new Vec2

        if (this.movementConfig.avoidWeight > 0) {
            let avoidForce = this.avoidBehavior.getDesiredVelocity(currentPosition)

            avoidForce.multiplyScalar(this.movementConfig.avoidWeight)
            totalTactiaclForce.add(avoidForce)
        }

        if (this.movementConfig.flocking.separationWeight > 0) {
            let separationForce = this.separationBehavior.getDesiredVelocity(currentPosition)
            separationForce.multiplyScalar(this.movementConfig.flocking.separationWeight)
            totalTactiaclForce.add(separationForce)
        }

        if (this.movementConfig.flocking.alignmentWeight > 0) {
            let alignmentForce = this.alignmentBehavior.getDesiredVelocity(currentPosition)
            alignmentForce.multiplyScalar(this.movementConfig.flocking.cohesionWeight)
            totalTactiaclForce.add(alignmentForce)
        }

        if (this.movementConfig.flocking.cohesionWeight > 0) {
            let cohesionForce = this.cohesionBehavior.getDesiredVelocity(currentPosition)
            cohesionForce.multiplyScalar(this.movementConfig.flocking.cohesionWeight)
            totalTactiaclForce.add(cohesionForce)
        }

        if (totalTactiaclForce.lengthSqr() > 1.0) {
            totalTactiaclForce.normalize()
        }

        return totalTactiaclForce
    }
}


