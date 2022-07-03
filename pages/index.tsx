import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  let [longUrl, setLongUrl] = useState('');
  let [links, setLinks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (localStorage.getItem('storedLinks')) {
      const storedLinks = JSON.parse(localStorage.getItem('storedLinks')!);
      setLinks(storedLinks);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const regexp = new RegExp(
      '^((http:\\/\\/|https:\\/\\/|)(www.|)[a-zA-Z0-9]+(\\.[a-zA-Z]+)+.*)$'
    );

    if (regexp.test(longUrl)) {
      try {
        const {
          data: { shortUrl },
        } = await axios.post('api/shorten', { longUrl });

        const storedLinks = { [shortUrl]: longUrl, ...links };
        setLinks(storedLinks);
        localStorage.setItem('storedLinks', JSON.stringify(storedLinks));

        setLongUrl('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClick = (shortUrl: string) => {
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

      <form onSubmit={handleSubmit}>
        <h2>Create a short url</h2>
        <input
          type='text'
          name='link'
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder='Shorten your link'
          required
        />
        <button type='submit'>Shorten</button>
      </form>

      <div>
        {Object.keys(links).map((short) => {
          const long = links[short];
          return (
            <div key={short}>
              <div>{long}</div>
              <div onClick={() => handleClick(short)}>
                {`${window.location.hostname}/${short}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
