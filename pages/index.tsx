import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  let [longUrl, setLongUrl] = useState('');
  let [links, setLinks] = useState<{ [key: string]: string }>({});

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
        setLinks({ [shortUrl]: longUrl, ...links });
        setLongUrl('');
      } catch (error) {
        console.error(error);
      }
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
