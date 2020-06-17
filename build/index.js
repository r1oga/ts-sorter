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
System.register("Sorter", [], function (exports_2, context_2) {
  "use strict";
  var Sorter;
  var __moduleName = context_2 && context_2.id;
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
      exports_2("Sorter", Sorter);
    },
  };
});
System.register(
  "index",
  ["NumbersCollection", "Sorter"],
  function (exports_3, context_3) {
    "use strict";
    var NumbersCollection_ts_1, Sorter_ts_1, numberCollection, sorter;
    var __moduleName = context_3 && context_3.id;
    return {
      setters: [
        function (NumbersCollection_ts_1_1) {
          NumbersCollection_ts_1 = NumbersCollection_ts_1_1;
        },
        function (Sorter_ts_1_1) {
          Sorter_ts_1 = Sorter_ts_1_1;
        },
      ],
      execute: function () {
        numberCollection = new NumbersCollection_ts_1.NumbersCollection(
          [-9, 3, -7, 1],
        );
        sorter = new Sorter_ts_1.Sorter(numberCollection);
        console.log(sorter.collection);
        sorter.sort();
        console.log(sorter.collection);
      },
    };
  },
);

__instantiate("index");
