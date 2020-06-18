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

System.register("NumbersCollection", [], function (exports_1, context_1) {
  "use strict";
  var NumbersCollection;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      NumbersCollection = class NumbersCollection {
        constructor(data) {
          this.data = data;
        }
        get length() {
          return this.data.length;
        }
        swap(leftIndex) {
          const leftHand = this.data[leftIndex];
          this.data[leftIndex] = this.data[leftIndex + 1];
          this.data[leftIndex + 1] = leftHand;
        }
        compare(leftIndex) {
          return this.data[leftIndex] > this.data[leftIndex + 1];
        }
      };
      exports_1("NumbersCollection", NumbersCollection);
    },
  };
});
System.register("CharactersCollection", [], function (exports_2, context_2) {
  "use strict";
  var CharactersCollection;
  var __moduleName = context_2 && context_2.id;
  return {
    setters: [],
    execute: function () {
      CharactersCollection = class CharactersCollection {
        constructor(data) {
          this.data = data;
        }
        get length() {
          return this.data.length;
        }
        swap(leftIndex) {
          const chars = this.data.split("");
          const leftHand = chars[leftIndex];
          chars[leftIndex] = chars[leftIndex + 1];
          chars[leftIndex + 1] = leftHand;
          this.data = chars.join("");
        }
        compare(leftIndex) {
          const lowerCaseStr = this.data.toLowerCase();
          return lowerCaseStr.charAt(leftIndex) >
            lowerCaseStr.charAt(leftIndex + 1);
        }
      };
      exports_2("CharactersCollection", CharactersCollection);
    },
  };
});
System.register("LinkedList", [], function (exports_3, context_3) {
  "use strict";
  var Node, LinkedList;
  var __moduleName = context_3 && context_3.id;
  return {
    setters: [],
    execute: function () {
      Node = class Node {
        constructor(data) {
          this.data = data;
          this.next = null;
        }
      };
      LinkedList = class LinkedList {
        constructor() {
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
      exports_3("LinkedList", LinkedList);
    },
  };
});
System.register("Sorter", [], function (exports_4, context_4) {
  "use strict";
  var Sorter;
  var __moduleName = context_4 && context_4.id;
  return {
    setters: [],
    execute: function () {
      Sorter = class Sorter {
        constructor(collection) {
          this.collection = collection;
        }
        sort() {
          const { length } = this.collection;
          for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
              if (this.collection.compare(j)) {
                this.collection.swap(j);
              }
            }
          }
        }
      };
      exports_4("Sorter", Sorter);
    },
  };
});
System.register(
  "index",
  ["LinkedList", "Sorter"],
  function (exports_5, context_5) {
    "use strict";
    var LinkedList_ts_1, Sorter_ts_1, linkedList, sorterLl;
    var __moduleName = context_5 && context_5.id;
    return {
      setters: [
        function (LinkedList_ts_1_1) {
          LinkedList_ts_1 = LinkedList_ts_1_1;
        },
        function (Sorter_ts_1_1) {
          Sorter_ts_1 = Sorter_ts_1_1;
        },
      ],
      execute: function () {
        // const numbersCollection = new NumbersCollection([10, -9, 3, -7, 1])
        // const sorterNum = new Sorter(numbersCollection)
        // console.log('Test numbers collection sorting:')
        // console.log(sorterNum.collection)
        // sorterNum.sort()
        // console.log(sorterNum.collection)
        // console.log()
        //
        // console.log('Test characters collection sorting:')
        // const charactersCollection = new CharactersCollection('testing')
        // const sorterChar = new Sorter(charactersCollection)
        // console.log(sorterChar.collection)
        // sorterChar.sort()
        // console.log(sorterChar.collection)
        console.log("Test linked list sorting:");
        linkedList = new LinkedList_ts_1.LinkedList();
        linkedList.add(0);
        linkedList.add(-10);
        linkedList.add(30);
        linkedList.add(5);
        sorterLl = new Sorter_ts_1.Sorter(linkedList);
        linkedList.print();
        sorterLl.sort();
      },
    };
  },
);

__instantiate("index");
