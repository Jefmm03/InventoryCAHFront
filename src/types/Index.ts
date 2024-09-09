

export type BadgeDetailData = {
    id?: number;
    number: number;
    department: string;
    status: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};

export type BadgeData = {
    id: number
    number: number;
    department: string;
    status: number;
};

export type CellphoneDetailData = {
    model: string;
    imei: number;
    number: number;
    user: string;
    pin: number;
    puk: number;
    icloudUser: string;
    icloudPass: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};

export type CellphoneData = {
    id: number;
    model: string;
    imei: number;
    number: number
    user: string;
    pin: number;
    puk: number;
    icloudUser: string;
    icloudPass: string;
};

export type ComputerDetailData = {
    serialNumber: string;
    assetNcr: string;
    model: string;
    user: string;
    department: string;
    status: string;
    wireMac: string;
    wirelessMac: string;
    memory: string;
    processor: string;
    processorSpeed: string;
    hardDisk: string;
    operatingSystem: string;
    computerName: string;
    domain: string;
    opticalDrive: string;
    padLock: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};

export type ComputerData = {
    id: number;
    serialNumber: string;
    assetNcr: string;
    model: string;
    user: string;
    computerName: string;
};

export type DockingDetailData = {
    serialNumber: string;
    user: string;
    key: string;
    modifiedBy: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
};

export type DockingData = {
    id: number;
    serialNumber: string;
    user: string;
    key: string;
};

export type MonitorDetailData = {
    id: number;
    serialNumber: string;
    activoCr: string;
    model: string;
    user: string;
    size: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};

export type MonitorData = {
    id: number;
    serialNumber: string;
    activoCr: string;
    model: string;
    user: string;
    size: number;
};

export type RicohDetailData = {
    id: number;
    serialNumber: string;
    activoCr: string;
    netName: string;
    model: string;
    link: string;
    location: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};

export type RicohData = {
    id: number;
    serialNumber: string;
    activoCr: string;
    netName: string;
    model: string;
    link: string;
    location: string;
};

export type StaticIPDetailData = {
    id: number;
    device: string;
    area: string;
    networkPoint: string;
    switch: string;
    ipaddress: string;
    line: string;
    location: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
};


export type StaticIPData = {
    id: number;
    device: string;
    area: string;
    networkPoint: string;
    switch: string;
    ipaddress: string;
    line: string;
    location: string;
};

export type TelCodeDetailData = {
    id: number;
    code: number;
    cor: number;
    callType: number;
    asignation: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
  };

  export type TelCodeData = {
    id: number;
    code: number;
    cor: number;
    callType: number;
    asignation: string;
  };

  export type TelephoneDetailData = {
    serie: string;
    activo: string;
    ext: number;
    employee: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    modifiedBy: string;
  };

  export type TelephoneData = {
    id: number;
    serie: string;
    activo: string;
    ext: number;
    employee: string;
  };



























