import { _decorator, Component, math, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';

export class SeekBehavior implements ISteeringBehavior {
    getDesiredVelocity(currentPosition: math.Vec2, targetPostion?: Readonly<math.Vec2>): math.Vec2 {
        let desiredDir = new Vec2
        Vec2.subtract(desiredDir, targetPostion, currentPosition)
        return desiredDir.normalize()
    }
}


