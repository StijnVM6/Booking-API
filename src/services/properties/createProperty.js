import { PrismaClient } from "@prisma/client";

const createProperty = async (
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId
) => {
    const primsa = new PrismaClient();

    const property = await primsa.property.create({
        data: {
            title: title,
            description: description,
            location: location,
            pricePerNight: pricePerNight,
            bedroomCount: bedroomCount,
            bathRoomCount: bathRoomCount,
            maxGuestCount: maxGuestCount,
            rating: rating,
            hostId: hostId
        }
    });

    return property;
};

export default createProperty;