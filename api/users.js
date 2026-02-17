// In-memory "database"
// NOTE: This will reset whenever the serverless function cold-starts (spins down).
// For production, replace this with a connection to MongoDB, Postgres, etc.
let users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "0987654321"
    }
];

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { method } = req;
    // Parse ID from query or path if needed (Vercel uses query params for dynamic routes usually, 
    // but here we are using a single endpoint /api/users logic)

    // Basic simulation of routing within the function:
    // If we wanted /api/users/:id, we'd need dynamic file routing like [id].js
    // For simplicity in this "single file API" refactor:
    // We will assume ID might be passed in query string for PUT/DELETE like ?id=1
    // OR we can rely on body for ID.
    // Standard JSON-Server uses /users/:id. 
    // To keep it simple for Vercel without creating many files:
    // We will expect usage like: /api/users?id=1 for specific ops if needed, 
    // OR we simply parse the ID from the URL if we set up rewrites correctly.

    // Let's use query param ?id=X for simplicity in this monolithic handler 
    // OR rely on path segment if we had [id].js.
    // Let's stick to standard REST body/query for now to avoid complex routing file structure.

    let { id } = req.query;
    // If id is not in query, check if it came from path rewrite (req.query.match)
    // vercel.json rewrite: /api/users/:match* -> match becomes an array of path segments
    if (!id && req.query.match) {
        // If match is array, take first element. If string, take it directly.
        id = Array.isArray(req.query.match) ? req.query.match[0] : req.query.match;
    }

    switch (method) {
        case 'GET':
            if (id) {
                const user = users.find(u => u.id == id);
                if (user) return res.status(200).json(user);
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(users);

        case 'POST':
            const newUser = {
                id: Date.now(),
                ...req.body
            };
            users.push(newUser);
            return res.status(201).json(newUser);

        case 'PUT':
            if (!id) return res.status(400).json({ message: 'ID required' });
            const index = users.findIndex(u => u.id == id);
            if (index > -1) {
                users[index] = { ...users[index], ...req.body };
                return res.status(200).json(users[index]);
            }
            return res.status(404).json({ message: 'User not found' });

        case 'DELETE':
            if (!id) return res.status(400).json({ message: 'ID required' });
            users = users.filter(u => u.id != id);
            return res.status(200).json({ message: `User ${id} deleted` });

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
