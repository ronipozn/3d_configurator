export class Configuration {
  configurationInputs: Config[];
  parts: Part[];
}

export class Config {
  name: string;
  type: string;
  values: Value[];
}

export class Value {
  label: string;
  code: string;
}

export class Part {
  geometry: string;
  parameters: {
    radius: number,
    height: number
  };
}
