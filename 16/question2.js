const transmission =
    "420D4900B8F31EFE7BD9DA455401AB80021504A2745E1007A21C1C862801F54AD0765BE833D8B9F4CE8564B9BE6C5CC011E00D5C001098F11A232080391521E4799FC5BB3EE1A8C010A00AE256F4963B33391DEE57DA748F5DCC011D00461A4FDC823C900659387DA00A49F5226A54EC378615002A47B364921C201236803349B856119B34C76BD8FB50B6C266EACE400424883880513B62687F38A13BCBEF127782A600B7002A923D4F959A0C94F740A969D0B4C016D00540010B8B70E226080331961C411950F3004F001579BA884DD45A59B40005D8362011C7198C4D0A4B8F73F3348AE40183CC7C86C017997F9BC6A35C220001BD367D08080287914B984D9A46932699675006A702E4E3BCF9EA5EE32600ACBEADC1CD00466446644A6FBC82F9002B734331D261F08020192459B24937D9664200B427963801A094A41CE529075200D5F4013988529EF82CEFED3699F469C8717E6675466007FE67BE815C9E84E2F300257224B256139A9E73637700B6334C63719E71D689B5F91F7BFF9F6EE33D5D72BE210013BCC01882111E31980391423FC4920042E39C7282E4028480021111E1BC6310066374638B200085C2C8DB05540119D229323700924BE0F3F1B527D89E4DB14AD253BFC30C01391F815002A539BA9C4BADB80152692A012CDCF20F35FDF635A9CCC71F261A080356B00565674FBE4ACE9F7C95EC19080371A009025B59BE05E5B59BE04E69322310020724FD3832401D14B4A34D1FE80233578CD224B9181F4C729E97508C017E005F2569D1D92D894BFE76FAC4C5FDDBA990097B2FBF704B40111006A1FC43898200E419859079C00C7003900B8D1002100A49700340090A40216CC00F1002900688201775400A3002C8040B50035802CC60087CC00E1002A4F35815900903285B401AA880391E61144C0004363445583A200CC2C939D3D1A41C66EC40";

const arr = (length) => Array(length).fill(null);

const binaryToDecimal = (binary) => parseInt(binary, 2);
const hexToBinary = (hex) => {
    let binary = "";
    for (const character of hex.split("")) {
        binary += parseInt(character, 16).toString(2).padStart(4, "0");
    }
    return binary;
};

const parse = (str, pad = true) => {
    const packet = str.split("");

    while (packet.length % 4 && pad) packet.unshift("0");

    const grabFirstNOfBits = (n) => arr(n).map(() => packet.shift());
    const parseNBitsToDecimal = (n) =>
        binaryToDecimal(grabFirstNOfBits(n).join(""));

    const version = parseNBitsToDecimal(3);
    const type = parseNBitsToDecimal(3);

    let parsedCharacters = 6;

    if (type === 4) {
        const bits = [];
        while (true) {
            const prefix = packet.shift();
            bits.push(...arr(4).map(() => packet.shift()));
            parsedCharacters += 5;
            if (prefix === "0") break;
        }

        return {
            version,
            type,
            value: binaryToDecimal(bits.join("")),
            parsedCharacters,
        };
    }

    const lengthType = packet.shift() === "0" ? "bits" : "packets";
    const length = lengthType === "bits" ? 15 : 11;
    const packetOrBitLength = parseNBitsToDecimal(length);
    parsedCharacters += length + 1;

    const subpackets = [];
    let parsedBitsOrPackets = 0;
    while (parsedBitsOrPackets < packetOrBitLength) {
        const subpacket = parse(packet.join(""), false);
        if (lengthType === "packets") {
            parsedBitsOrPackets++;
        } else {
            parsedBitsOrPackets += subpacket.parsedCharacters;
        }
        subpackets.push(subpacket);
        grabFirstNOfBits(subpacket.parsedCharacters);
        parsedCharacters += subpacket.parsedCharacters;
    }

    return { version, type, subpackets, parsedCharacters };
};

const parsed = parse(hexToBinary(transmission));

const calculateTransmission = ({ value, type, subpackets }) => {
    if (subpackets) {
        const values = subpackets.map((subpacket) =>
            calculateTransmission(subpacket)
        );
        switch (type) {
            case 0:
                return values.reduce((acc, val) => acc + val, 0);
            case 1:
                return values.reduce((acc, val) => acc * val, 1);
            case 2:
                values.sort((a, b) => b - a);
                return values.pop();
            case 3:
                values.sort((a, b) => a - b);
                return values.pop();
            case 5:
                return values[0] > values[1] ? 1 : 0;
            case 6:
                return values[0] < values[1] ? 1 : 0;
            case 7:
                return values[0] === values[1] ? 1 : 0;
            default:
                break;
        }
    }

    return value;
};

console.log("🧝", calculateTransmission(parsed));
