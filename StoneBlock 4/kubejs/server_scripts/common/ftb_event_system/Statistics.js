let $LevelResource = Java.loadClass("net.minecraft.world.level.storage.LevelResource");



const Statistics = (() => {
    let instance;
    
    function Statistics(server) {
        if (instance) return instance;
        if (!server) throw new Error("Server instance is required to create Statistics");
        instance = this;
        this.__construct(server);
    }

    return Statistics;
})()

Statistics.prototype.__construct = function(server) {
    this.server = server;
    this.path = server.getWorldPath($LevelResource.ROOT);
    this.success = {};
    this.failure = {};
    this.file = "ftb_events_statistics.json";
    this.load();
}
Statistics.prototype.__destroy = function() {
    instance = null;
    this.server = null;
    this.path = null;
    this.failure = {};
    this.success = {};
}

Statistics.prototype.getAsString = function() {
    return JSON.stringify({
        failure: this.failure,
        success: this.success
    });
}

Statistics.prototype.getAsJson = function() {
    return {
        failure: this.failure,
        success: this.success
    };
}

Statistics.prototype.getTotalEvents = function() {
    let total = 0;
    for(let key in this.failure) {
        total += this.failure[key];
    }
    for(let key in this.success) {
        total += this.success[key];
    }
    return total;
    
}

Statistics.prototype.addFailure = function(EventName) {
    if (!this.failure[EventName]) {
        this.failure[EventName] = 1;
    } else {
        this.failure[EventName]++;
    }
    this.write();

}
Statistics.prototype.addSuccess = function(EventName) {
    if (!this.success[EventName]) {
        this.success[EventName] = 1;
    }
    else {
        this.success[EventName]++;
    }
    console.log("Event Success: " + EventName);
    this.write();

}
Statistics.prototype.removeSuccess = function(EventName) {
    if (this.success[EventName]) {
        this.success[EventName]--;
        if (this.success[EventName] <= 0) {
            delete this.success[EventName];
        }
    } else {
        console.log("No success count for event: " + EventName);
    }
    this.write();
}

Statistics.prototype.removeFailure = function(EventName) {
    if (this.failure[EventName]) {
        this.failure[EventName]--;
        if (this.failure[EventName] <= 0) {
            delete this.failure[EventName];
        }
    } else {
        console.log("No failure count for event: " + EventName);
    }
    this.write();
}

Statistics.prototype.getPath = function() {
    return this.path;
}

Statistics.prototype.load = function() {
    let json = JsonIO.read(this.path + "/" + this.file);
    if (json) {
        this.failure = json.failure || {};
        this.success = json.success || {};
    }
}
Statistics.prototype.write = function() {
    try{
        JsonIO.write(this.path + "/" + this.file, this.getAsString());
    } catch (e) {
        console.log("Failed to write statistics file: " + e);
    }
}
Statistics.prototype.reset = function() {
    this.failure = {};
    this.success = {};
    this.write();
}
