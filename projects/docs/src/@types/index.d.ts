declare interface NavsURLs {
    releases: string;
    github: string;
    contribute: string;
    issues: string;
}

declare module "@pkg" {
    const data: NPMPackage;
    export default data;
}

declare module "*components-list.json" {
    const data: Array<ComponentsListItem>;
    export default data;
}

declare interface ComponentsListItem {
    name: string;
    path: string;
    filePath: string;
}

declare interface NPMPackage {
    name: string;
    version: string;
    description: string;
    license: string;
    keywords: Array<string>;
    repository: {
        type: string;
        url: string;
    };
    bugs: {
        url: string;
    };
    homepage: string;
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}

declare interface ApiSection {
    name: string;
    description: string;
    inputs?: Array<any>;
    outputs?: Array<any>;
    methods?: Array<APIOutputs>;
    properties?: Array<APIInputs>;
}

declare interface APIInputs {
    default: any;
    description: string;
    end: number;
    isOptional: boolean;
    isStatic: boolean;
    name: string;
    start: number;
    type: string;
    visibility: any;
}

declare interface APIOutputs {
    description: string;
    end: number;
    functionCall: string;
    isAbstract: boolean;
    isAsync: boolean;
    isOptional: boolean;
    isStatic: boolean;
    name: string;
    parameters: any[];
    start: number;
    type: string;
    variables: any[];
    visibility: undefined;
}

declare interface APIInput {
    comment?: string;
    decorator?: string;
    alias?: string;
    accessor?: string;
    name?: string;
    optional?: string;
    default?: any;
    type?: string;
    private?: string;
    skip?: string;
}

declare interface ParsedAPI {
    [key: string]: APIInput;
}
