import { Skeleton, SkeletonProps } from '@mantine/core'

interface IMySkeletonTable extends SkeletonProps { }

export default function MySkeletonTable({ h = 500 }: IMySkeletonTable) {
    return (
        <Skeleton h={h} />
    )
}
