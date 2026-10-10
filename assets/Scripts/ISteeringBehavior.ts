import { _decorator, Component, Node, Vec2 } from 'cc';

export interface ISteeringBehavior {
    getDesiredVelocity(currentPosition: Vec2, targetPostion?: Readonly<Vec2>,
        targetVelocity?: Readonly<Vec2>): Vec2
}


