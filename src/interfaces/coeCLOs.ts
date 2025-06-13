interface ICoeCLOs extends IBaseEntity {
    order?: number,
    description?: string,
    coecgId?: number,
    densityCLO?: number,
    coeclopi?: [ICoeCLOPI]
}