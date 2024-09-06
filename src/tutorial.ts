import { z } from 'zod'

const tourSchema = z.object({
    id: z.string(),
    name: z.string(),
    info: z.string(),
    image: z.string(),
    price: z.string()
})

type Tour = z.infer<typeof tourSchema>

const url = 'https://www.course-api.com/react-tours-project';

async function fetchData(url: string): Promise<Tour[]> {
    try {
        const response = await fetch(url);

        // Check if the request was successful.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rowData: Tour[] = await response.json();
        const result = tourSchema.array().safeParse(rowData)
        console.log(result);

        if (!result.success) {
            throw new Error(`Invalid data: ${result.error}`)
        }

        return result.data;
    } catch (error) {
        const errMsg =
            error instanceof Error ? error.message : 'there was an error...';
        console.error(errMsg);
        // throw error;
        return [];
    }
}

const tours = await fetchData(url);
tours.map((tour) => {
    console.log(tour.name);

});