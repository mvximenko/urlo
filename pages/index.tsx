import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {
  TopSection,
  Row,
  LeftColumn,
  RightColumn,
  Heading,
  Paragraph,
  Section,
  Form,
  Input,
  ShortenButton,
  Links,
  ListItem,
  RightSide,
  LongLink,
  ShortLink,
  CopyButton,
  BottomSection,
  Repository,
  RepositoryHeading,
  RepositoryLink,
} from '../styles/styles';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [copied, setCopied] = useState<string[]>([]);
  const [links, setLinks] = useState<{ [key: string]: string }>({});

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
    const url = `https://${window.location.hostname}/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied([shortUrl, ...copied]);
        setTimeout(() => {
          setCopied((prevState) => prevState.filter((url) => url !== shortUrl));
        }, 2000);
      },
      () => {
        alert('Could not copy link to the clipboard');
      }
    );
  };

  return (
    <>
      <TopSection>
        <Heading>URLO</Heading>

        <Row>
          <LeftColumn>
            <Heading>Link shortening service</Heading>
            <Paragraph>
              You can make a short link from a long one for free using our
              service
            </Paragraph>
          </LeftColumn>

          <RightColumn>
            <Image
              src='/illustration-working.svg'
              alt='Link shortening service'
              layout='fill'
              objectFit='contain'
              priority={true}
            />
          </RightColumn>
        </Row>
      </TopSection>

      <Section>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            name='link'
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder='Shorten your link'
            required
          />
          <ShortenButton type='submit'>Shorten It!</ShortenButton>
        </Form>

        {Object.keys(links).length !== 0 && (
          <Links>
            {Object.keys(links).map((short) => {
              const long = links[short];
              return (
                <ListItem key={short}>
                  <LongLink>{long}</LongLink>
                  <RightSide>
                    <ShortLink href={short}>
                      {`${window.location.hostname}/${short}`}
                    </ShortLink>

                    {copied.includes(short) ? (
                      <CopyButton copy>Copied</CopyButton>
                    ) : (
                      <CopyButton onClick={() => handleClick(short)}>
                        Copy
                      </CopyButton>
                    )}
                  </RightSide>
                </ListItem>
              );
            })}
          </Links>
        )}
      </Section>

      <BottomSection>
        <Repository>
          <RepositoryHeading>Source Code</RepositoryHeading>
          <RepositoryLink href='https://github.com/mvximenko/urlo'>
            GO TO REPOSITORY
          </RepositoryLink>
        </Repository>
      </BottomSection>
    </>
  );
}
