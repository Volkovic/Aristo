## Closure

JavaScript permite escribir una función dentro de una función externa. Podemos escribir tantas funciones internas como queramos. Si la función interna accede a las variables de la función externa entonces se llama closure (clausura).

```js
function outerFunction() {
  let count = 0;
  function innerFunction() {
    count++;
    return count;
  }

  return innerFunction;
}
const innerFunc = outerFunction();

console.log(innerFunc());
console.log(innerFunc());
console.log(innerFunc());
```

---


```sh
1
2
3
```

Veamos más ejemplos de funciones internas

```js
function outerFunction() {
  let count = 0;
  function plusOne() {
    count++;
    return count;
  }
  function minusOne() {
    count--;
    return count;
  }

  return {
    plusOne: plusOne(),
    minusOne: minusOne(),
  };
}
const innerFuncs = outerFunction();

console.log(innerFuncs.plusOne);
console.log(innerFuncs.minusOne);
```

---


```sh
1
0
```