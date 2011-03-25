/// <reference path="../../qunit/qunit.js" />
/// <reference path="ResourceLoader.js" />

test("resource list length test", function () {
    var rl = new ResourceLoader();
    rl.add({ type: "image", key: "pic1", src: "1.jpg" });
    equal(rl.resourceList.length, 1);
    rl.add({ type: "audio", key: "audio1", src: "01.mp3" }); 
    equal(rl.resourceList.length, 2);
});



asyncTest("resource list items callback test", function () {
    var rl = new ResourceLoader();
    rl.add({ type: "image", key: "pic1", src: "1.jpg" });
    rl.add({ type: "audio", key: "audio1", src: "01.mp3" });
    rl.add({ type: "video", key: "video1", src: "01.mp4" }); 

    rl.itemLoad = function () {
        ok(true, "item " + this.type + " callback success");
    }
    rl.onload = function () {
        ok(true, "all items callback success");
        start();
    }
    rl.load();
});

asyncTest("user resource after load", function () {
    var rl = new ResourceLoader();
    rl.add({ type: "image", key: "pic1", src: "1.jpg" });
    rl.add({ type: "audio", key: "audio1", src: "01.mp3" }); 

    rl.onload = function () {
        notEqual(rl.rs["pic1"], null);
        notEqual(rl.rs["audio1"], null); 
        start();
    }
    rl.load();
});

asyncTest("delete resource item test", function () {
    var rl = new ResourceLoader();
    rl.add({ type: "image", key: "pic1", src: "1.jpg" });

    rl.onload = function () {
        var length = rl.resourceList.length;

        rl.clearItem("pic1");
        equal(rl.rs["pic1"], null);
        equal(rl.resourceList.length, length - 1, "resource list's length is minus 1");
        start();
    }
    rl.load();
});

asyncTest("delete all resource item test", function () {
    var rl = new ResourceLoader();
    rl.add({ type: "image", key: "pic1", src: "1.jpg" });
    rl.add({ type: "audio", key: "audio1", src: "01.mp3" }); 

    rl.onload = function () {
        rl.clearAll();
        equal(rl.rs["pic1"], null);
        equal(rl.rs["audio1"], null);
        equal(rl.resourceList.length, 0, "resource list is empty after clearAll");
        start();
    }
    rl.load();
});

asyncTest("call onload  while resource", function () {
    var rs = new ResourceLoader();
    rs.onload = function () {
        ok(true, "yes! empty call!");
        start();
    }

    rs.load();
});