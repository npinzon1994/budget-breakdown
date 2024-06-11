class Option {
  value: string;
  label: string;
  image?: string;

  constructor(value: string, label: string, image?: string) {
    this.value = value;
    this.label = label;
    this.image = image;
  }
}

export default Option;
