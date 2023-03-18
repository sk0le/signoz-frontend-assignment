# SigNox Front-end Assignment

Hi! My name is Amel Islamovic, and this is my submisson to the task you provided here: [Google Docs](https://docs.google.com/document/d/1Uapx_WVpB661afSG6dXe8wMMNyArxeXZX0yGd2AHXpU/edit?usp=sharing)

This is preview of what I have made.
![alt](https://i.ibb.co/fxf3BR1/image.png)

## Explanation

For my solution I decided to use Context, and I have 2 funtion

- `get(path: string) => return all folders and files with specific path`
- `drop(id: number, path: string, folder: boolean, gottenPath: string, gottenName: string)`

### `get`

This function just returns all folders and files in form of object with specified path

### `drop`

This function is called on `onDrop` event, this uses `folder` parameter if what is being dropped is folder or file, if it's file then update files state, but if it's folder update folders state, and also check for files/folders inside of that folder.

## User Input

Because I didn't know what you meant by user input, there is file `src/data/sampleData.ts` that you can change what folders/files looks like.

## Types

Types are located at `src/@types/`

## Testing

If I'm being honest, I never wrote much of test before, so I will submit this solution without testing, and I will try to write tests until you review my submisson.

## Download and start

```bash
git clone https://github.com/sk0le/signoz-frontend-assignment.git

cd signoz-frontend-assignment

yarn

yarn start
```

Made by: Amel Islamovic aka sk0le - islamovicamel13@gmail.com
