---
title: 'export default用法大全'
description: 'JavaScript模块化语法export default的详细用法'
date: '2024-11-15'
tags: ['JavaScript', '模块化', '教程']
---

`export default` 是 JavaScript 中的一种模块化语法，用于将一个模块的主要功能导出。它可以导出一个对象、类、函数、变量等。其他模块可以使用 `import` 语法导入这个默认导出的内容。下面是如何使用 `export default` 和 `import` 的几个常见示例。

### 1. 导出一个函数

你可以将一个函数作为默认导出：

```javascript
// myFunction.js
export default function() {
  console.log('Hello from the default function!');
}
```

然后，其他文件可以通过 `import` 语法导入并使用这个函数：

```javascript
// main.js
import myFunction from './myFunction.js'; // 导入默认导出的函数

myFunction(); // 输出: Hello from the default function!
```

### 2. 导出一个对象

你也可以导出一个对象作为默认导出：

```javascript
// settings.js
const settings = {
  theme: 'dark',
  language: 'en'
};

export default settings;
```

导入这个对象：

```javascript
// app.js
import settings from './settings.js'; // 导入默认导出的对象

console.log(settings.theme); // 输出: dark
console.log(settings.language); // 输出: en
```

### 3. 导出一个类

`export default` 可以用来导出一个类：

```javascript
// Person.js
export default class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

导入并使用这个类：

```javascript
// app.js
import Person from './Person.js'; // 导入默认导出的类

const person = new Person('Alice');
person.greet(); // 输出: Hello, my name is Alice
```

### 4. 导出一个箭头函数

你也可以导出一个箭头函数：

```javascript
// greet.js
export default () => {
  console.log('Hello from the default arrow function!');
};
```

导入并调用它：

```javascript
// app.js
import greet from './greet.js'; // 导入默认导出的箭头函数

greet(); // 输出: Hello from the default arrow function!
```

### 5. 与 `export` 一起使用（命名导出 vs 默认导出）

你还可以同时使用命名导出和默认导出。命名导出允许你导出多个不同的值，而默认导出则只能有一个导出：

```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) {
  return a * b;
}
```

导入时，你可以选择导入默认导出或者命名导出：

```javascript
// app.js
import multiply, { add, subtract } from './utils.js';

console.log(add(1, 2));        // 输出: 3
console.log(subtract(5, 3));   // 输出: 2
console.log(multiply(2, 3));   // 输出: 6
```

### 小结

- `export default` 用于导出一个模块的主功能，可以是一个函数、对象、类或任何其他类型。
- `import` 用于在其他模块中导入默认导出的内容。
- 一个模块只能有一个 `export default`，但是可以有多个命名导出。

通过使用 `export default`，你可以让模块的接口更简洁、直观。