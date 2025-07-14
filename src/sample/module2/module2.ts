import { Module1 } from 'sample/module1/module1';

export class Module2 {
  private module1 = new Module1();

  getValue() {
    return `module2-value-${this.module1.getValue()}`;
  }
}
