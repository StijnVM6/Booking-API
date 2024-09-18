import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const updatePropertyById = async (
    id,
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

    const property = await primsa.property.updateMany({
        where: { id: id },
        data: {
            title: title,
            description: description,
            location: location,
            pricePerNight: Number.parseFloat(pricePerNight),
            bedroomCount: Number(bedroomCount),
            bathRoomCount: Number(bathRoomCount),
            maxGuestCount: Number(maxGuestCount),
            rating: Number(rating),
            hostId: hostId
        }
    });

    if (property.count <= 0) {
        throw new notFoundError("Property", id);
    } else return property;
};

export default updatePropertyById;