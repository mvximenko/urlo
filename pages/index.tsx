import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  let [longUrl, setLongUrl] = useState('');
  let [links, setLinks] = useState<{ [key: string]: string }>({});

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const {
        data: { shortUrl },
      } = await axios.post('api/shorten', { longUrl });

      setLinks({ [shortUrl]: longUrl, ...links });
      setLongUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  const onShortUrlClick = (shortUrl: string) => {
    const url = `${window.location.hostname}/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log('Copied link to the clipboard');
      },
      () => {
        alert('Could not copy link to the clipboard');
      }
    );
  };

  return (
    <div>
      <h1>URLO</h1>
      <div>
        <h2>Create a short url</h2>
        <input
          type='text'
          placeholder='Enter URL'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleClick}>Shorten</button>
      </div>

      <div>
        {Object.keys(links).map((short) => {
          const long = links[short];
          return (
            <div key={short}>
              <div>{long}</div>

              <div onClick={() => onShortUrlClick(short)}>
                {`${window.location.hostname}/${short}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
