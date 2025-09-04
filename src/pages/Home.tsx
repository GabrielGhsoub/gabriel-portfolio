import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui';
import { useLocalStorage } from '../hooks';

export const Home = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useLocalStorage('user-name', '');

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to React App</h1>
        <p className="text-xl text-gray-600">
          A modern React application with TypeScript, Tailwind CSS, and best
          practices
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Counter Example</CardTitle>
            <CardDescription>
              A simple counter to demonstrate state management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-semibold">Count: {count}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setCount(count - 1)} variant="outline">
                Decrement
              </Button>
              <Button onClick={() => setCount(count + 1)}>Increment</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Local Storage Example</CardTitle>
            <CardDescription>
              Demonstrates custom hook usage with localStorage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            {name && (
              <p className="text-center text-lg">
                Hello, <span className="font-semibold">{name}</span>!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
