import { math, Vec2 } from "cc";
import { IntentConfig } from "./EnemyConfig";
import { FleeBehavior } from "./FleeBehavior";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { SeekBehavior } from "./SeekBehavior";
import { PursuitBehavior } from "./PursuitBehavior";


export class IntentSteeringBehavior implements ISteeringBehavior {
    private intent: IntentConfig
    private seekBehavior: SeekBehavior = new SeekBehavior()
    private fleeBehavior: FleeBehavior = new FleeBehavior()
    private pursuitBehavior: PursuitBehavior
    
    public setWeights(steering: IntentConfig) {
        this.intent = steering
        this.pursuitBehavior = new PursuitBehavior(steering.maxSpeed, steering.maxPredictionTime)
    }

    getDesiredVelocity(currentPosition: math.Vec2, targetPostion?: Readonly<math.Vec2>, targetVelocity?: Readonly<math.Vec2>): math.Vec2 {
        let totalSteeringForce = new Vec2

        if(!targetPostion) return totalSteeringForce

        if (this.intent.seekWeight > 0 && targetPostion) {
            let seekForce = this.pursuitBehavior.getDesiredVelocity(currentPosition, targetPostion, targetVelocity)
            seekForce.multiplyScalar(this.intent.seekWeight)
            totalSteeringForce.add(seekForce)
        }

        if (this.intent.fleeWeight > 0 && targetPostion) {
            let fleeForce = this.fleeBehavior.getDesiredVelocity(currentPosition, targetPostion)
            fleeForce.multiplyScalar(this.intent.fleeWeight)
            totalSteeringForce.add(fleeForce)
        }

        if (totalSteeringForce.lengthSqr() > 1.0) {
            totalSteeringForce.normalize()
        }

        return totalSteeringForce
    }
}


