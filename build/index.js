// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("Sorter", [], function (exports_1, context_1) {
  "use strict";
  var Sorter;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      Sorter = class Sorter {
        sort() {
          for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
              if (this.compare(j)) {
                this.swap(j);
              }
            }
          }
        }
      };
      exports_1("Sorter", Sorter);
    },
  };
});
System.register("swap", [], function (exports_2, context_2) {
  "use strict";
  var __moduleName = context_2 && context_2.id;
  function swapConstructor(arr) {
    return (leftIndex) => {
      const leftHand = arr[leftIndex];
      arr[leftIndex] = arr[leftIndex + 1];
      arr[leftIndex + 1] = leftHand;
    };
  }
  exports_2("swapConstructor", swapConstructor);
  return {
    setters: [],
    execute: function () {
    },
  };
});
System.register(
  "NumbersCollection",
  ["Sorter", "swap"],
  function (exports_3, context_3) {
    "use strict";
    var Sorter_ts_1, swap_ts_1, NumbersCollection;
    var __moduleName = context_3 && context_3.id;
    return {
      setters: [
        function (Sorter_ts_1_1) {
          Sorter_ts_1 = Sorter_ts_1_1;
        },
        function (swap_ts_1_1) {
          swap_ts_1 = swap_ts_1_1;
        },
      ],
      execute: function () {
        NumbersCollection = class NumbersCollection extends Sorter_ts_1.Sorter {
          constructor(data) {
            super();
            this.data = data;
          }
          get length() {
            return this.data.length;
          }
          swap(leftIndex) {
            swap_ts_1.swapConstructor(this.data)(leftIndex);
          }
          compare(leftIndex) {
            return this.data[leftIndex] > this.data[leftIndex + 1];
          }
        };
        exports_3("NumbersCollection", NumbersCollection);
      },
    };
  },
);
System.register(
  "CharactersCollection",
  ["Sorter", "swap"],
  function (exports_4, context_4) {
    "use strict";
    var Sorter_ts_2, swap_ts_2, CharactersCollection;
    var __moduleName = context_4 && context_4.id;
    return {
      setters: [
        function (Sorter_ts_2_1) {
          Sorter_ts_2 = Sorter_ts_2_1;
        },
        function (swap_ts_2_1) {
          swap_ts_2 = swap_ts_2_1;
        },
      ],
      execute: function () {
        CharactersCollection = class CharactersCollection
          extends Sorter_ts_2.Sorter {
          constructor(data) {
            super();
            this.data = data;
          }
          get length() {
            return this.data.length;
          }
          swap(leftIndex) {
            const chars = this.data.split("");
            swap_ts_2.swapConstructor(chars)(leftIndex);
            this.data = chars.join("");
          }
          compare(leftIndex) {
            const lowerCaseStr = this.data.toLowerCase();
            return lowerCaseStr.charAt(leftIndex) >
              lowerCaseStr.charAt(leftIndex + 1);
          }
        };
        exports_4("CharactersCollection", CharactersCollection);
      },
    };
  },
);
System.register("LinkedList", ["Sorter"], function (exports_5, context_5) {
  "use strict";
  var Sorter_ts_3, Node, LinkedList;
  var __moduleName = context_5 && context_5.id;
  return {
    setters: [
      function (Sorter_ts_3_1) {
        Sorter_ts_3 = Sorter_ts_3_1;
      },
    ],
    execute: function () {
      Node = class Node {
        constructor(data) {
          this.data = data;
          this.next = null;
        }
      };
      LinkedList = class LinkedList extends Sorter_ts_3.Sorter {
        constructor() {
          super(...arguments);
          this.head = null;
        }
        add(data) {
          const node = new Node(data);
          if (!this.head) {
            this.head = node;
            return;
          }
          let tail = this.head;
          while (tail.next) {
            tail = tail.next;
          }
          tail.next = node;
        }
        get length() {
          if (!this.head) {
            return 0;
          }
          let length = 1;
          let node = this.head;
          while (node.next) {
            length++;
            node = node.next;
          }
          return length;
        }
        at(index) {
          if (!this.head) {
            throw new Error("Index out of bounds");
          }
          let counter = 0;
          let node = this.head;
          while (node) {
            if (counter === index) {
              return node;
            }
            counter++;
            node = node.next;
          }
          throw new Error("Index out of bounds");
        }
        compare(leftIndex) {
          if (!this.head) {
            throw new Error("List is empty");
          }
          return this.at(leftIndex).data > this.at(leftIndex + 1).data;
        }
        swap(leftIndex) {
          const leftNode = this.at(leftIndex);
          const rightNode = this.at(leftIndex + 1);
          const leftHand = leftNode.data;
          leftNode.data = rightNode.data;
          rightNode.data = leftHand;
        }
        print() {
          if (!this.head) {
            return;
          }
          let node = this.head;
          while (node) {
            console.log(node.data);
            node = node.next;
          }
        }
      };
      exports_5("LinkedList", LinkedList);
    },
  };
});
System.register(
  "index",
  ["NumbersCollection", "CharactersCollection"],
  function (exports_6, context_6) {
    "use strict";
    var NumbersCollection_ts_1,
      CharactersCollection_ts_1,
      numbersCollection,
      charactersCollection;
    var __moduleName = context_6 && context_6.id;
    return {
      setters: [
        function (NumbersCollection_ts_1_1) {
          NumbersCollection_ts_1 = NumbersCollection_ts_1_1;
        },
        function (CharactersCollection_ts_1_1) {
          CharactersCollection_ts_1 = CharactersCollection_ts_1_1;
        },
      ],
      execute: function () {
        numbersCollection = new NumbersCollection_ts_1.NumbersCollection(
          [10, -9, 3, -7, 1],
        );
        console.log("Test numbers collection sorting:");
        console.log(numbersCollection.data);
        numbersCollection.sort();
        console.log(numbersCollection.data);
        console.log();
        console.log("Test characters collection sorting:");
        charactersCollection = new CharactersCollection_ts_1
          .CharactersCollection("testing");
        console.log(charactersCollection.data);
        charactersCollection.sort();
        console.log(charactersCollection.data);
      },
    };
  },
);

__instantiate("index");
