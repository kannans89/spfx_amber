var StudentV1 = /** @class */ (function () {
    function StudentV1(name, cgpa) {
        if (name === void 0) { name = "Anonymous"; }
        if (cgpa === void 0) { cgpa = 0; }
        this.name = name;
        this.cgpa = cgpa;
    }
    return StudentV1;
}());
var s1 = new StudentV1();
console.log(s1);
s1.cgpa = 7.5;
s1.name = "John";
console.log(s1);
var StudentV2 = /** @class */ (function () {
    function StudentV2(name, cgpa) {
        if (name === void 0) { name = "Anonymous"; }
        if (cgpa === void 0) { cgpa = 0; }
        this.name = name;
        this.cgpa = cgpa;
    }
    return StudentV2;
}());
console.log("StudentV2");
var s2 = new StudentV2();
console.log(s2);
var StudentV3 = /** @class */ (function () {
    function StudentV3(name, cgpa) {
        if (name === void 0) { name = "Anonymous"; }
        if (cgpa === void 0) { cgpa = 0; }
        this.name = name;
        this.cgpa = cgpa;
    }
    StudentV3.prototype.setUserName = function (name) {
        this.name = name;
    };
    StudentV3.prototype.getUserName = function () {
        return this.name;
    };
    return StudentV3;
}());
console.log("StudentV3");
var s3 = new StudentV3();
s3.setUserName("Amber");
console.log(s3.getUserName());
console.log(s3);
//properties in typescript classes ,C# property syntax
var StudentV4 = /** @class */ (function () {
    function StudentV4(name, cgpa) {
        if (name === void 0) { name = "Anonymous"; }
        if (cgpa === void 0) { cgpa = 0; }
        this.name = name;
        this.cgpa = cgpa;
    }
    Object.defineProperty(StudentV4.prototype, "UserName", {
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentV4.prototype, "Cgpa", {
        set: function (cgpa) {
            this.cgpa = cgpa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StudentV4.prototype, "Cpga", {
        get: function () {
            return this.cgpa;
        },
        enumerable: false,
        configurable: true
    });
    return StudentV4;
}());
var s4 = new StudentV4();
s4.UserName = "John";
s4.Cgpa = 7.5;
console.log(s4);
