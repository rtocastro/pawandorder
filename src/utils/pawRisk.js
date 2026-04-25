export const calculateHeatIndex = (temp, humidity) => {
    if (temp < 80) return temp;

    return (
        -42.379 +
        2.04901523 * temp +
        10.14333127 * humidity -
        0.22475541 * temp * humidity -
        0.00683783 * temp ** 2 -
        0.05481717 * humidity ** 2 +
        0.00122874 * temp ** 2 * humidity +
        0.00085282 * temp * humidity ** 2 -
        0.00000199 * temp ** 2 * humidity ** 2
    );
};

export const calculateWindChill = (temp, windMph) => {
    if (temp > 50 || windMph <= 3) return temp;

    return (
        35.74 +
        0.6215 * temp -
        35.75 * windMph ** 0.16 +
        0.4275 * temp * windMph ** 0.16
    );
};

export const estimateConcreteTemp = ({ temp, humidity, windMph, clouds }) => {
    const heatIndex = calculateHeatIndex(temp, humidity);

    let concreteBoost = 8;

    if (temp >= 80) concreteBoost += 8;
    if (temp >= 90) concreteBoost += 8;
    if (clouds < 25) concreteBoost += 10;
    if (clouds > 70) concreteBoost -= 8;
    if (windMph > 10) concreteBoost -= 4;

    return Math.round(heatIndex + concreteBoost);
};

export const getPawStatus = ({ temp, humidity, windMph, clouds, condition }) => {
    const concreteTemp = estimateConcreteTemp({
        temp,
        humidity,
        windMph,
        clouds,
    });

    const windChill = calculateWindChill(temp, windMph);
    const isSnowing = condition === "Snow";
    const isFreezing = temp <= 32;

    if (concreteTemp >= 125) {
        return {
            level: "danger",
            title: "Shoes recommended!",
            concreteTemp,
            feelsLike: Math.round(Math.max(concreteTemp, windChill)),
            message:
                "That concrete may be too hot for paws. Try dog shoes, shade, grass, or a later walk.",
        };
    }

    if (concreteTemp >= 105) {
        return {
            level: "caution",
            title: "Use caution!",
            concreteTemp,
            feelsLike: Math.round(Math.max(concreteTemp, windChill)),
            message:
                "The sidewalk may be getting spicy. Test it with your hand before walking.",
        };
    }


    if (windChill <= 20) {
        return {
            level: "danger",
            title: "Too cold for paws!",
            concreteTemp,
            feelsLike: Math.round(windChill),
            message:
                "Extreme cold can hurt your dog’s paws. Limit time outside or use booties.",
        };
    }

    if (isFreezing) {
        return {
            level: "caution",
            title: "Cold surface warning!",
            concreteTemp,
            feelsLike: Math.round(windChill),
            message:
                "Snow, ice, and salt may irritate paws. Consider dog shoes or wipe paws after walks.",
        };
    }

    if (isSnowing) {
        return {
            level: "caution",
            title: "Snowy conditions!",
            concreteTemp,
            feelsLike: Math.round(windChill),
            message:
                "Snow can build up in paws and ice melt chemicals may irritate them. Booties recommended.",
        };
    }
    return {
        level: "safe",
        title: "Paws look good!",
        concreteTemp,
        feelsLike: Math.round(temp),
        message:
            "Conditions seem okay for your pup, but always check the pavement with your hand first.",
    };
};