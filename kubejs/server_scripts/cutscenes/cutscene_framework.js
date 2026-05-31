
// ============================================================================
// JAVA CLASS IMPORTS
// ============================================================================

var CutsceneData = Java.loadClass("com.finderfeed.fdlib.systems.cutscenes.CutsceneData");
var CameraPos = Java.loadClass("com.finderfeed.fdlib.systems.cutscenes.CameraPos");
var CurveType = Java.loadClass("com.finderfeed.fdlib.systems.cutscenes.CurveType");
var EasingType = Java.loadClass("com.finderfeed.fdlib.systems.cutscenes.EasingType");
var StopMode = Java.loadClass("com.finderfeed.fdlib.systems.cutscenes.CutsceneData$StopMode");
var FDLibCalls = Java.loadClass("com.finderfeed.fdlib.FDLibCalls");
var Vec3 = Java.loadClass("net.minecraft.world.phys.Vec3");


// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

/**
 * Global cutscene configuration
 */
var CutsceneConfig = {
    /** Default cutscene duration in ticks */
    DEFAULT_DURATION: 100,

    /** Default number of keyframes for smooth motion */
    DEFAULT_KEYFRAMES: 10,

    /** Default curve interpolation type */
    DEFAULT_CURVE: "CATMULLROM",

    /** Default time easing */
    DEFAULT_TIME_EASING: "EASE_IN_OUT",

    /** Default look easing */
    DEFAULT_LOOK_EASING: "EASE_IN_OUT",

    /** Timing presets (in ticks, 20 ticks = 1 second) */
    TIMING: {
        INSTANT: 1,
        VERY_FAST: 20,      // 1 second
        FAST: 40,           // 2 seconds
        NORMAL: 60,         // 3 seconds
        SLOW: 100,          // 5 seconds
        VERY_SLOW: 200,     // 10 seconds
        CINEMATIC: 300      // 15 seconds
    },

    /** Camera movement speeds (blocks per second) */
    SPEED: {
        CRAWL: 1,
        WALK: 4.3,
        SPRINT: 5.6,
        FLY: 10,
        FAST_FLY: 20,
        WARP: 50
    }
};

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

/**
 * Easing types for smooth animations
 * Maps to FDLib's EasingType enum
 */
var CutsceneEasing = {
    /** No easing - constant speed */
    LINEAR: "LINEAR",

    /** Accelerate from zero velocity */
    EASE_IN: "EASE_IN",

    /** Decelerate to zero velocity */
    EASE_OUT: "EASE_OUT",

    /** Accelerate then decelerate */
    EASE_IN_OUT: "EASE_IN_OUT",

    /**
     * Get Java EasingType enum from string
     * @param {string} easingName - Name of easing type
     * @returns {Java.type("com.finderfeed.fdlib.systems.cutscenes.EasingType")}
     */
    get: function(easingName) {
        if (!easingName) {
            throw new Error("Easing name cannot be null or undefined");
        }

        var normalizedName = easingName.toUpperCase();
        var javaEasing = EasingType[normalizedName];

        if (!javaEasing) {
            throw new Error("Unknown easing type: " + easingName + ". Valid options: LINEAR, EASE_IN, EASE_OUT, EASE_IN_OUT");
        }

        return javaEasing;
    }
};

// ============================================================================
// CURVE INTERPOLATION TYPES
// ============================================================================

/**
 * Curve types for camera path interpolation
 */
var CutsceneCurve = {
    /** Linear interpolation - straight lines between points */
    LINEAR: "LINEAR",

    /** Catmull-Rom spline - smooth curves through all points */
    CATMULLROM: "CATMULLROM",

    /**
     * Get Java CurveType enum from string
     * @param {string} curveName - Name of curve type
     * @returns {Java.type("com.finderfeed.fdlib.systems.cutscenes.CurveType")}
     */
    get: function(curveName) {
        if (!curveName) {
            throw new Error("Curve name cannot be null or undefined");
        }

        var normalizedName = curveName.toUpperCase();
        var javaCurve = CurveType[normalizedName];

        if (!javaCurve) {
            throw new Error("Unknown curve type: " + curveName + ". Valid options: LINEAR, CATMULLROM");
        }

        return javaCurve;
    }
};

// ============================================================================
// VECTOR UTILITIES
// ============================================================================

/**
 * Vector3 utility functions for camera positioning
 */
var CutsceneVectors = {
    /**
     * Create a new Vec3
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} z - Z coordinate
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    create: function(x, y, z) {
        if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
            throw new Error("Vec3 coordinates must be numbers. Got: " + typeof x + ", " + typeof y + ", " + typeof z);
        }
        return new Vec3(x, y, z);
    },

    /**
     * Create Vec3 from entity position
     * @param {Internal.Entity} entity - Entity to get position from
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    fromEntity: function(entity) {
        if (!entity) {
            throw new Error("Entity cannot be null");
        }
        return new Vec3(entity.x, entity.y, entity.z);
    },

    /**
     * Create Vec3 from entity eye position
     * @param {Internal.Entity} entity - Entity to get eye position from
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    fromEntityEyes: function(entity) {
        if (!entity) {
            throw new Error("Entity cannot be null");
        }
        return new Vec3(entity.x, entity.y + entity.getEyeHeight(), entity.z);
    },

    /**
     * Add two vectors
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v1 - First vector
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v2 - Second vector
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    add: function(v1, v2) {
        if (!v1 || !v2) {
            throw new Error("Vectors cannot be null");
        }
        return v1.add(v2);
    },

    /**
     * Subtract two vectors
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v1 - First vector
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v2 - Second vector
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    subtract: function(v1, v2) {
        if (!v1 || !v2) {
            throw new Error("Vectors cannot be null");
        }
        return v1.subtract(v2);
    },

    /**
     * Multiply vector by scalar
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v - Vector
     * @param {number} scalar - Scalar multiplier
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    multiply: function(v, scalar) {
        if (!v) {
            throw new Error("Vector cannot be null");
        }
        if (typeof scalar !== "number") {
            throw new Error("Scalar must be a number");
        }
        return v.scale(scalar);
    },

    /**
     * Calculate distance between two vectors
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v1 - First vector
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v2 - Second vector
     * @returns {number} Distance
     */
    distance: function(v1, v2) {
        if (!v1 || !v2) {
            throw new Error("Vectors cannot be null");
        }
        return v1.distanceTo(v2);
    },

    /**
     * Normalize vector (make length = 1)
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v - Vector
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    normalize: function(v) {
        if (!v) {
            throw new Error("Vector cannot be null");
        }
        return v.normalize();
    },

    /**
     * Linear interpolation between two vectors
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v1 - Start vector
     * @param {Java.type("net.minecraft.world.phys.Vec3")} v2 - End vector
     * @param {number} t - Interpolation factor (0-1)
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    lerp: function(v1, v2, t) {
        if (!v1 || !v2) {
            throw new Error("Vectors cannot be null");
        }
        if (typeof t !== "number" || t < 0 || t > 1) {
            throw new Error("Interpolation factor must be between 0 and 1");
        }
        return v1.lerp(v2, t);
    },

    /**
     * Get vector offset by distance in direction
     * @param {Java.type("net.minecraft.world.phys.Vec3")} origin - Origin position
     * @param {number} yaw - Yaw angle in degrees
     * @param {number} pitch - Pitch angle in degrees
     * @param {number} distance - Distance to offset
     * @returns {Java.type("net.minecraft.world.phys.Vec3")}
     */
    offset: function(origin, yaw, pitch, distance) {
        if (!origin) {
            throw new Error("Origin cannot be null");
        }

        var yawRad = yaw * JavaMath.PI / 180;
        var pitchRad = pitch * JavaMath.PI / 180;

        var x = -JavaMath.sin(yawRad) * JavaMath.cos(pitchRad) * distance;
        var y = -JavaMath.sin(pitchRad) * distance;
        var z = JavaMath.cos(yawRad) * JavaMath.cos(pitchRad) * distance;

        return origin.add(new Vec3(x, y, z));
    }
};

// ============================================================================
// CAMERA KEYFRAME
// ============================================================================

/**
 * Represents a single camera keyframe with position and rotation
 */
function CutsceneKeyframe(position, yaw, pitch, roll) {
    this.position = position;
    this.yaw = yaw || 0;
    this.pitch = pitch || 0;
    this.roll = roll || 0;
}

/**
 * Create Java CameraPos from this keyframe
 * @returns {Java.type("com.finderfeed.fdlib.systems.cutscenes.CameraPos")}
 */
CutsceneKeyframe.prototype.toJava = function() {
    if (!this.position) {
        throw new Error("Keyframe position cannot be null");
    }
    return new CameraPos(this.position, this.yaw, this.pitch, this.roll);
};

/**
 * Clone this keyframe
 * @returns {CutsceneKeyframe}
 */
CutsceneKeyframe.prototype.clone = function() {
    return new CutsceneKeyframe(
        new Vec3(this.position.x, this.position.y, this.position.z),
        this.yaw,
        this.pitch,
        this.roll
    );
};

// ============================================================================
// CAMERA PATH BUILDER
// ============================================================================

/**
 * Builder for creating camera paths with multiple keyframes
 */
function CameraPath() {
    this.keyframes = [];
}

/**
 * Add a keyframe at position with rotation
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} z - Z coordinate
 * @param {number} yaw - Yaw rotation (optional)
 * @param {number} pitch - Pitch rotation (optional)
 * @param {number} roll - Roll rotation (optional)
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addPoint = function(x, y, z, yaw, pitch, roll) {
    var pos = CutsceneVectors.create(x, y, z);
    var keyframe = new CutsceneKeyframe(pos, yaw, pitch, roll);
    this.keyframes.push(keyframe);
    return this;
};

/**
 * Add a keyframe from Vec3 position
 * @param {Java.type("net.minecraft.world.phys.Vec3")} position - Position vector
 * @param {number} yaw - Yaw rotation (optional)
 * @param {number} pitch - Pitch rotation (optional)
 * @param {number} roll - Roll rotation (optional)
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addVec3 = function(position, yaw, pitch, roll) {
    if (!position) {
        throw new Error("Position cannot be null");
    }
    var keyframe = new CutsceneKeyframe(position, yaw, pitch, roll);
    this.keyframes.push(keyframe);
    return this;
};

/**
 * Add a keyframe at entity position looking at entity
 * @param {Internal.Entity} entity - Entity to position camera at
 * @param {number} offsetX - X offset from entity (optional)
 * @param {number} offsetY - Y offset from entity (optional)
 * @param {number} offsetZ - Z offset from entity (optional)
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addEntity = function(entity, offsetX, offsetY, offsetZ) {
    if (!entity) {
        throw new Error("Entity cannot be null");
    }

    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetZ = offsetZ || 0;

    var pos = CutsceneVectors.create(
        entity.x + offsetX,
        entity.y + entity.getEyeHeight() + offsetY,
        entity.z + offsetZ
    );

    var keyframe = new CutsceneKeyframe(pos, entity.yaw, entity.pitch, 0);
    this.keyframes.push(keyframe);
    return this;
};

/**
 * Add a keyframe looking at a target position
 * @param {number} x - Camera X position
 * @param {number} y - Camera Y position
 * @param {number} z - Camera Z position
 * @param {number} targetX - Target X to look at
 * @param {number} targetY - Target Y to look at
 * @param {number} targetZ - Target Z to look at
 * @param {number} roll - Roll rotation (optional)
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addLookingAt = function(x, y, z, targetX, targetY, targetZ, roll) {
    var pos = CutsceneVectors.create(x, y, z);
    var target = CutsceneVectors.create(targetX, targetY, targetZ);
    var direction = CutsceneVectors.subtract(target, pos);

    var yaw = JavaMath.atan2(-direction.x, direction.z) * 180 / JavaMath.PI;
    var pitch = JavaMath.asin(-direction.y / JavaMath.sqrt(direction.x * direction.x + direction.y * direction.y + direction.z * direction.z)) * 180 / JavaMath.PI;

    var keyframe = new CutsceneKeyframe(pos, yaw, pitch, roll || 0);
    this.keyframes.push(keyframe);
    return this;
};

/**
 * Add circular orbit keyframes around a center point
 * @param {number} centerX - Center X coordinate
 * @param {number} centerY - Center Y coordinate
 * @param {number} centerZ - Center Z coordinate
 * @param {number} radius - Orbit radius
 * @param {number} startAngle - Starting angle in degrees
 * @param {number} endAngle - Ending angle in degrees
 * @param {number} points - Number of keyframes to generate
 * @param {boolean} lookAtCenter - Whether to look at center (optional, default true)
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addOrbit = function(centerX, centerY, centerZ, radius, startAngle, endAngle, points, lookAtCenter) {
    if (points < 2) {
        throw new Error("Orbit must have at least 2 points");
    }

    lookAtCenter = lookAtCenter !== false;

    var angleStep = (endAngle - startAngle) / (points - 1);

    for (var i = 0; i < points; i++) {
        var angle = startAngle + (angleStep * i);
        var angleRad = angle * JavaMath.PI / 180;

        var x = centerX + radius * JavaMath.cos(angleRad);
        var z = centerZ + radius * JavaMath.sin(angleRad);

        if (lookAtCenter) {
            this.addLookingAt(x, centerY, z, centerX, centerY, centerZ, 0);
        } else {
            this.addPoint(x, centerY, z, angle + 90, 0, 0);
        }
    }

    return this;
};

/**
 * Add spin keyframes where camera stays at one point and rotates around
 * @param {number} x - Camera X position
 * @param {number} y - Camera Y position
 * @param {number} z - Camera Z position
 * @param {number} startYaw - Starting yaw angle in degrees
 * @param {number} endYaw - Ending yaw angle in degrees
 * @param {number} pitch - Pitch angle in degrees (optional, default 0)
 * @param {number} points - Number of keyframes to generate
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addSpin = function(x, y, z, startYaw, endYaw, pitch, points) {
    if (points < 2) {
        throw new Error("Spin must have at least 2 points");
    }

    pitch = pitch || 0;

    var yawStep = (endYaw - startYaw) / (points - 1);

    for (var i = 0; i < points; i++) {
        var yaw = startYaw + (yawStep * i);
        this.addPoint(x, y, z, yaw, pitch, 0);
    }

    return this;
};


/**
 * Add arc (parabolic) keyframes between two points
 * @param {number} startX - Start X
 * @param {number} startY - Start Y
 * @param {number} startZ - Start Z
 * @param {number} endX - End X
 * @param {number} endY - End Y
 * @param {number} endZ - End Z
 * @param {number} height - Arc height above midpoint
 * @param {number} points - Number of keyframes
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addArc = function(startX, startY, startZ, endX, endY, endZ, height, points) {
    if (points < 2) {
        throw new Error("Arc must have at least 2 points");
    }

    for (var i = 0; i < points; i++) {
        var t = i / (points - 1);

        var x = startX + (endX - startX) * t;
        var y = startY + (endY - startY) * t + height * JavaMath.sin(t * JavaMath.PI);
        var z = startZ + (endZ - startZ) * t;

        var yaw = JavaMath.atan2(endZ - startZ, endX - startX) * 180 / JavaMath.PI - 90;
        var pitch = -JavaMath.asin(height * JavaMath.PI * JavaMath.cos(t * JavaMath.PI) / JavaMath.sqrt(JavaMath.pow(endX - startX, 2) + JavaMath.pow(endZ - startZ, 2))) * 180 / JavaMath.PI;

        this.addPoint(x, y, z, yaw, pitch, 0);
    }

    return this;
};


/**
 * Add spiral keyframes
 * @param {number} centerX - Center X
 * @param {number} startY - Starting Y
 * @param {number} centerZ - Center Z
 * @param {number} startRadius - Starting radius
 * @param {number} endRadius - Ending radius
 * @param {number} height - Total height
 * @param {number} turns - Number of full rotations
 * @param {number} points - Number of keyframes
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.addSpiral = function(centerX, startY, centerZ, startRadius, endRadius, height, turns, points) {
    if (points < 2) {
        throw new Error("Spiral must have at least 2 points");
    }

    for (var i = 0; i < points; i++) {
        var t = i / (points - 1);
        var angle = turns * 360 * t;
        var angleRad = angle * JavaMath.PI / 180;
        var radius = startRadius + (endRadius - startRadius) * t;

        var x = centerX + radius * JavaMath.cos(angleRad);
        var y = startY + height * t;
        var z = centerZ + radius * JavaMath.sin(angleRad);

        this.addPoint(x, y, z, angle + 90, 0, 0);
    }

    return this;
};

/**
 * Get total number of keyframes
 * @returns {number} Number of keyframes
 */
CameraPath.prototype.getKeyframeCount = function() {
    return this.keyframes.length;
};

/**
 * Clear all keyframes
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.clear = function() {
    this.keyframes = [];
    return this;
};

/**
 * Schedule a callback to execute at a specific time during the cutscene
 * The callback will be executed relative to the current keyframe position in the timeline
 * @param {function(Internal.Player): void} callback - Function to execute, receives the player
 * @param {Cutscene} cutscene - Parent cutscene reference to schedule callbacks
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.execute = function(callback, cutscene) {
    if (typeof callback !== "function") {
        throw new Error("Callback must be a function");
    }
    if (!cutscene) {
        throw new Error("Cutscene reference required for scheduling callbacks");
    }

    // Calculate delay based on current position in the path
    // If we have keyframes, calculate proportional delay
    var keypointIndex = this.keyframes.length;
    var totalDuration = cutscene.duration;

    // Calculate delay: proportional to keyframe position
    var delay;
    if (keypointIndex === 0) {
        // Execute at start
        delay = 0;
    } else {
        // Execute proportionally through the cutscene
        // This assumes evenly distributed keyframes
        var progress = keypointIndex / JavaMath.max(cutscene.path.keyframes.length, 1);
        delay = JavaMath.floor(totalDuration * progress);
    }

    // Add callback to cutscene's scheduled callbacks
    cutscene.scheduledCallbacks.push({
        delay: delay,
        callback: callback
    });

    return this;
};

/**
 * Schedule a callback to execute at a specific tick offset from the start
 * @param {number} ticks - Ticks from start (20 ticks = 1 second)
 * @param {function(Internal.Player): void} callback - Function to execute
 * @param {Cutscene} cutscene - Parent cutscene reference
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.executeAt = function(ticks, callback, cutscene) {
    if (typeof ticks !== "number" || ticks < 0) {
        throw new Error("Ticks must be a non-negative number");
    }
    if (typeof callback !== "function") {
        throw new Error("Callback must be a function");
    }
    if (!cutscene) {
        throw new Error("Cutscene reference required for scheduling callbacks");
    }

    cutscene.scheduledCallbacks.push({
        delay: ticks,
        callback: callback
    });

    return this;
};

/**
 * Schedule a callback to execute at a specific second offset from the start
 * @param {number} seconds - Seconds from start
 * @param {function(Internal.Player): void} callback - Function to execute
 * @param {Cutscene} cutscene - Parent cutscene reference
 * @returns {CameraPath} This path for chaining
 */
CameraPath.prototype.executeAtSecond = function(seconds, callback, cutscene) {
    if (typeof seconds !== "number" || seconds < 0) {
        throw new Error("Seconds must be a non-negative number");
    }

    var ticks = JavaMath.floor(seconds * 20);
    return this.executeAt(ticks, callback, cutscene);
};

// ============================================================================
// CUTSCENE BUILDER
// ============================================================================

/**
 * Main cutscene builder with fluent API
 */
function Cutscene() {
    this.path = new CameraPath();
    this.duration = CutsceneConfig.DEFAULT_DURATION;
    this.curveType = CutsceneConfig.DEFAULT_CURVE;
    this.timeEasing = CutsceneConfig.DEFAULT_TIME_EASING;
    this.lookEasing = CutsceneConfig.DEFAULT_LOOK_EASING;
    this.stopMode = "AUTOMATIC";
    this.nextCutscene = null;
    this.screenEffects = [];
    this.scheduledCallbacks = []; // Array of {delay: number, callback: function}
}

/**
 * Set cutscene duration in ticks
 * @param {number} ticks - Duration in ticks (20 ticks = 1 second)
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setDuration = function(ticks) {
    if (typeof ticks !== "number" || ticks <= 0) {
        throw new Error("Duration must be a positive number");
    }
    this.duration = ticks;
    return this;
};

/**
 * Set cutscene duration in seconds
 * @param {number} seconds - Duration in seconds
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setDurationSeconds = function(seconds) {
    if (typeof seconds !== "number" || seconds <= 0) {
        throw new Error("Duration must be a positive number");
    }
    this.duration = JavaMath.floor(seconds * 20);
    return this;
};

/**
 * Set curve interpolation type
 * @param {string} curveType - "LINEAR" or "CATMULLROM"
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setCurve = function(curveType) {
    if (!curveType) {
        throw new Error("Curve type cannot be null");
    }
    this.curveType = curveType.toUpperCase();
    return this;
};

/**
 * Set time easing function
 * @param {string} easingType - Easing type name
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setTimeEasing = function(easingType) {
    if (!easingType) {
        throw new Error("Easing type cannot be null");
    }
    this.timeEasing = easingType.toUpperCase();
    return this;
};

/**
 * Set look (rotation) easing function
 * @param {string} easingType - Easing type name
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setLookEasing = function(easingType) {
    if (!easingType) {
        throw new Error("Easing type cannot be null");
    }
    this.lookEasing = easingType.toUpperCase();
    return this;
};

/**
 * Set both time and look easing to the same value
 * @param {string} easingType - Easing type name
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setEasing = function(easingType) {
    this.setTimeEasing(easingType);
    this.setLookEasing(easingType);
    return this;
};

/**
 * Set stop mode
 * @param {string} mode - "AUTOMATIC", "PLAYER", or "UNSTOPPABLE"
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setStopMode = function(mode) {
    if (!mode) {
        throw new Error("Stop mode cannot be null");
    }
    var normalizedMode = mode.toUpperCase();
    if (normalizedMode !== "AUTOMATIC" && normalizedMode !== "PLAYER" && normalizedMode !== "UNSTOPPABLE") {
        throw new Error("Invalid stop mode: " + mode + ". Valid options: AUTOMATIC, PLAYER, UNSTOPPABLE");
    }
    this.stopMode = normalizedMode;
    return this;
};

/**
 * Chain another cutscene to play after this one
 * @param {Cutscene} cutscene - Next cutscene to play
 * @returns {Cutscene} This cutscene for chaining
 */
Cutscene.prototype.setNext = function(cutscene) {
    if (!cutscene) {
        throw new Error("Next cutscene cannot be null");
    }
    this.nextCutscene = cutscene;
    return this;
};

/**
 * Get the camera path builder
 * @returns {CameraPath} The camera path
 */
Cutscene.prototype.getPath = function() {
    return this.path;
};

/**
 * Build and return the Java CutsceneData object
 * @returns {Java.type("com.finderfeed.fdlib.systems.cutscenes.CutsceneData")}
 */
Cutscene.prototype.build = function() {
    if (this.path.keyframes.length === 0) {
        throw new Error("Cutscene must have at least one camera keyframe");
    }

    var data = CutsceneData.create();

    data.time(this.duration);
    data.moveCurveType(CutsceneCurve.get(this.curveType));
    data.timeEasing(CutsceneEasing.get(this.timeEasing));
    data.lookEasing(CutsceneEasing.get(this.lookEasing));
    data.stopMode(StopMode[this.stopMode]);

    for (var i = 0; i < this.path.keyframes.length; i++) {
        var keyframe = this.path.keyframes[i];
        data.addCameraPos(keyframe.toJava());
    }

    if (this.nextCutscene) {
        data.nextCutscene(this.nextCutscene.build());
    }

    return data;
};

/**
 * Play this cutscene for a player using FDLibCalls API
 * Also schedules any callbacks that were registered
 * @param {Internal.Player} player - Player to show cutscene to
 */
Cutscene.prototype.play = function(player) {
    if (!player) {
        throw new Error("Player cannot be null");
    }

    var cutsceneData = this.build();
    FDLibCalls.startCutsceneForPlayer(player, cutsceneData);

    // Schedule all callbacks
    var server = player.level.getServer();
    for (var i = 0; i < this.scheduledCallbacks.length; i++) {
        var scheduled = this.scheduledCallbacks[i];
        var delay = scheduled.delay;
        var callback = scheduled.callback;

        // Create closure to capture player and callback
        (function(p, cb, d) {
            server.scheduleInTicks(d, function() {
                try {
                    cb(p);
                } catch (e) {
                    console.error("Error executing cutscene callback at tick " + d + ": " + e.message);
                }
            });
        })(player, callback, delay);
    }

    // If there's a next cutscene, schedule it
    if (this.nextCutscene) {
        var nextCutscene = this.nextCutscene;
        server.scheduleInTicks(this.duration, function() {
            nextCutscene.play(player);
        });
    }
};

/**
 * Play this cutscene for all players in a level
 * Also schedules callbacks for each player
 * @param {Internal.Level} level - Level containing players
 */
Cutscene.prototype.playForAll = function(level) {
    if (!level) {
        throw new Error("Level cannot be null");
    }

    var players = level.players;

    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        this.play(player); // Use play() to handle callbacks
    }
};

/**
 * Play this cutscene for specific players
 * Also schedules callbacks for each player
 * @param {Internal.Player[]} players - Array of players
 */
Cutscene.prototype.playForPlayers = function(players) {
    if (!players || players.length === 0) {
        throw new Error("Players array cannot be null or empty");
    }

    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        if (player) {
            this.play(player); // Use play() to handle callbacks
        }
    }
};

// ============================================================================
// CUTSCENE PRESETS
// ============================================================================

/**
 * Pre-configured cutscene templates
 */
var CutscenePresets = {
    /**
     * Create a simple orbit cutscene around a point
     * @param {number} centerX - Center X
     * @param {number} centerY - Center Y
     * @param {number} centerZ - Center Z
     * @param {number} radius - Orbit radius
     * @param {number} durationSeconds - Duration in seconds
     * @returns {Cutscene}
     */
    orbit: function(centerX, centerY, centerZ, radius, durationSeconds) {
        var cutscene = new Cutscene();
        cutscene
            .setDurationSeconds(durationSeconds || 5)
            .setCurve("CATMULLROM")
            .setEasing("LINEAR");

        cutscene.getPath().addOrbit(centerX, centerY, centerZ, radius, 0, 360, 20, true);

        return cutscene;
    },

    /**
     * Create a flyby cutscene from start to end
     * @param {number} startX - Start X
     * @param {number} startY - Start Y
     * @param {number} startZ - Start Z
     * @param {number} endX - End X
     * @param {number} endY - End Y
     * @param {number} endZ - End Z
     * @param {number} durationSeconds - Duration in seconds
     * @returns {Cutscene}
     */
    flyby: function(startX, startY, startZ, endX, endY, endZ, durationSeconds) {
        var cutscene = new Cutscene();
        cutscene
            .setDurationSeconds(durationSeconds || 3)
            .setCurve("CATMULLROM")
            .setEasing("EASE_IN_OUT");

        var yaw = JavaMath.atan2(endZ - startZ, endX - startX) * 180 / JavaMath.PI - 90;

        cutscene.getPath()
            .addPoint(startX, startY, startZ, yaw, 0, 0)
            .addPoint(endX, endY, endZ, yaw, 0, 0);

        return cutscene;
    },

    /**
     * Create a dramatic reveal cutscene
     * @param {number} x - Reveal point X
     * @param {number} y - Reveal point Y
     * @param {number} z - Reveal point Z
     * @param {number} distance - Distance from reveal point
     * @param {number} durationSeconds - Duration in seconds
     * @returns {Cutscene}
     */
    reveal: function(x, y, z, distance, durationSeconds) {
        var cutscene = new Cutscene();
        cutscene
            .setDurationSeconds(durationSeconds || 4)
            .setCurve("CATMULLROM")
            .setTimeEasing("EASE_OUT")
            .setLookEasing("EASE_IN");

        cutscene.getPath()
            .addLookingAt(x - distance, y + distance * 0.5, z, x, y, z, 0)
            .addLookingAt(x - distance * 0.3, y + distance * 0.2, z, x, y, z, 0)
            .addLookingAt(x - distance * 0.1, y, z, x, y, z, 0);

        return cutscene;
    },

    /**
     * Create a panning cutscene
     * @param {number} x - Pan center X
     * @param {number} y - Pan center Y
     * @param {number} z - Pan center Z
     * @param {number} startYaw - Starting yaw
     * @param {number} endYaw - Ending yaw
     * @param {number} durationSeconds - Duration in seconds
     * @returns {Cutscene}
     */
    pan: function(x, y, z, startYaw, endYaw, durationSeconds) {
        var cutscene = new Cutscene();
        cutscene
            .setDurationSeconds(durationSeconds || 3)
            .setCurve("LINEAR")
            .setEasing("EASE_IN_OUT");

        cutscene.getPath()
            .addPoint(x, y, z, startYaw, 0, 0)
            .addPoint(x, y, z, endYaw, 0, 0);

        return cutscene;
    },

    /**
     * Create a dramatic zoom cutscene
     * @param {number} startX - Start X
     * @param {number} startY - Start Y
     * @param {number} startZ - Start Z
     * @param {number} targetX - Target X to zoom to
     * @param {number} targetY - Target Y to zoom to
     * @param {number} targetZ - Target Z to zoom to
     * @param {number} durationSeconds - Duration in seconds
     * @returns {Cutscene}
     */
    zoom: function(startX, startY, startZ, targetX, targetY, targetZ, durationSeconds) {
        var cutscene = new Cutscene();
        cutscene
            .setDurationSeconds(durationSeconds || 2)
            .setCurve("CATMULLROM")
            .setEasing("EASE_IN");

        cutscene.getPath()
            .addLookingAt(startX, startY, startZ, targetX, targetY, targetZ, 0)
            .addLookingAt(targetX, targetY, targetZ, targetX, targetY, targetZ, 0);

        return cutscene;
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Stop cutscene for a player using FDLibCalls API
 * @param {Internal.Player} player - Player to stop cutscene for
 */
function stopCutscene(player) {
    if (!player) {
        throw new Error("Player cannot be null");
    }
    FDLibCalls.stopCutsceneForPlayer(player);
}

/**
 * Calculate duration in ticks based on path length and speed
 * @param {CameraPath} path - Camera path
 * @param {number} blocksPerSecond - Travel speed in blocks per second
 * @returns {number} Duration in ticks
 */
function calculateDurationFromSpeed(path, blocksPerSecond) {
    if (!path || path.keyframes.length < 2) {
        throw new Error("Path must have at least 2 keyframes");
    }
    if (blocksPerSecond <= 0) {
        throw new Error("Speed must be positive");
    }

    var totalDistance = 0;
    for (var i = 0; i < path.keyframes.length - 1; i++) {
        var current = path.keyframes[i].position;
        var next = path.keyframes[i + 1].position;
        totalDistance += CutsceneVectors.distance(current, next);
    }

    var seconds = totalDistance / blocksPerSecond;
    return JavaMath.ceil(seconds * 20);
}

