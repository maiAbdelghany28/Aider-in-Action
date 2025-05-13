import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj, buttonName) {
  // Scientific functions
  if (["sin", "cos", "tan", "log", "√"].includes(buttonName)) {
    const input = parseFloat(obj.next || obj.total);
    let result = null;

    switch (buttonName) {
      case "sin":
        result = Math.sin((input * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((input * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((input * Math.PI) / 180);
        break;
      case "log":
        result = Math.log10(input);
        break;
      case "√":
        result = Math.sqrt(input);
        break;
      default:
        result = input;
    }

    return {
      total: result.toString(),
      next: null,
      operation: null,
    };
  }

  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
      };
    }

    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result).div(Big("100")).toString(),
        next: null,
        operation: null,
      };
    }

    if (obj.next) {
      return {
        next: Big(obj.next).div(Big("100")).toString(),
      };
    }

    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Handle exponentiation (^)
  if (buttonName === "^") {
    return {
      total: obj.next,
      next: null,
      operation: "^",
    };
  }

  // Handle operation chaining
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  if (!obj.next) {
    return { operation: buttonName };
  }

  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}