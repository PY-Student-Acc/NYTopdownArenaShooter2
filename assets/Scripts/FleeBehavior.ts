import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";

export class FleeBehavior implements ISteeringBehavior {
    
    getDesiredVelocity(currentPosition: math.Vec2, targetPostion?: Readonly<math.Vec2>): math.Vec2 {
        let desiredDir = new Vec2

        if (!targetPostion) return Vec2.ZERO

        Vec2.subtract(desiredDir, currentPosition, targetPostion)
        return desiredDir.normalize()
    }
}


