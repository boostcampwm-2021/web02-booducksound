import { character } from '../../../types/character';

const Character = (props: character) => {
  const { color, width } = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width.toString()}
        height={width.toString()}
        viewBox="0 0 2835 2835"
      >
        <path
          id="색상_칠_8"
          data-name="색상 칠 8"
          fill={`#${color}`}
          fillRule="evenodd"
          d="M1371,233c397.65-6.027,650.52,158.689,777,424,49.45,103.724,103.23,272.248,64,429-16.31,65.16-44.34,115.43-78,163l-46,58q30.495,16.5,61,33c54.49,29.95,104.68,61.31,153,97l51,45q8.505,9.495,17,19,22.005,7.005,44,14c49,21.21,89.47,57.08,117,100,47.74,74.44,95.61,256.07,54,373-9.84,27.67-28.23,57.65-49,75-16.46,13.74-29.5,21.69-39,43-105.6,237-245.45,338.91-505,421-78.85,24.94-160.1,32.83-248,51-55.21,11.41-116.7,10.31-176,20l-78,3q-63.99,1.005-128,2-35.49-1.005-71-2c-80.3-12.97-160.99-6.3-236-24-56.907-13.43-115.9-20.38-170-37-147.434-45.3-279.168-97.17-382-186-54.4-46.99-99.059-115.1-135-180q-16-32.49-32-65l-9-24q-11.5-7.995-23-16c-25.716-20.61-46.478-53.53-58-88-9.773-29.24-16.136-79.27-10-117q2-32.49,4-65c20.12-98.28,46.164-189.85,112-242a357.344,357.344,0,0,1,67-42q22-7.005,44-14l19-21q24-21,48-42c49.219-35.24,98.894-68.06,154-98l62-33q-3.5-3.495-7-7-21-27-42-54c-29.329-42.04-57.032-88.34-72-144-27.484-102.207-15.7-251.425,16-340,83.707-233.866,226.048-382.884,451-475,56.47-23.122,119.7-32.864,186-46Z"
        />
        <path
          id="색상_칠_7"
          data-name="색상 칠 7"
          fill=" #f5d024"
          fillRule="evenodd"
          d="M1412,836c40.01,6.644,69.32,8.157,97,25,21.59,13.138,39.21,34.811,54,55,21.27,29.036,59.8,67.852,89,89,28.96,20.97,60.6,41.92,95,57,26.7,11.71,53.53,21.02,76,37,32.1,22.83,27.61,49.25,5,78-126.82,161.29-508.19,189.05-717,82-43.16-22.12-120.026-66.42-132-116-10.358-42.89,93.31-77.77,122-91,53.4-24.63,118.72-78.721,152-124,13.98-19.019,31.22-42.855,50-57,18.82-14.172,43.52-25.016,70-31Z"
        />
        <path
          id="색상_칠_5"
          data-name="색상 칠 5"
          fill="#ed9522"
          fillRule="evenodd"
          d="M1411,1026c47.87,7.74,90.28,6.02,130,20q49.995,17.505,100,35,43.5,18.495,87,37c20.38,6.12,57.97,9.47,83,4,9.82-2.15,24.44-4.01,33,0,1.85,31.53-122.48,46.21-165,37-127.36-27.59-334.88-35.59-473-2l-64,12h-16c-45.24,12.24-136-3.33-147-31,1-1.33,2-2.67,3-4,34.96,0.62,70.94,5.45,102-2,27.14-6.51,50.99-20.58,74-32q48.495-19.995,97-40c34.95-13.78,72.78-19.32,111-30Q1388.5,1028.005,1411,1026Z"
        />
        <path
          id="색상_칠_3"
          data-name="색상 칠 3"
          fillRule="evenodd"
          d="M1902,738c68.96-.14,108.2,46.13,124,100,19.51,66.527-2.72,135.557-54,153-89.73,30.53-179.69-96.112-153-183,9.3-30.26,29.64-55.893,59-66Zm19,34c-22.82,17.565-8.95,63.522,25,54C1962.17,805.515,1952.76,771.022,1921,772Z"
        />
        <path
          id="색상_칠_2"
          data-name="색상 칠 2"
          fillRule="evenodd"
          d="M893,740c178.4-3.194,99.347,282.83-46,253-66.393-13.627-85.662-108.343-54-176,13.6-29.054,35.236-54.241,65-67Zm12,25c-14.2,7.2-44.747,42.708-13,54,26.47,11.815,46.02-31.38,25-53Z"
        />
        <path
          id="색상_칠_1"
          data-name="색상 칠 1"
          fillRule="evenodd"
          d="M1377,232c402.24-5.56,648.81,166.681,777,436,47.84,100.505,97.3,273.233,58,422-16.09,60.9-42.81,105.43-72,152q-25.5,32.49-51,65c23.56,7.28,46.84,23.88,67,36,57.17,34.36,111.11,66.36,162,106l41,38q5.505,6.495,11,13,22.995,7.5,46,15c26.18,11.3,49.87,29.12,71,46,76.7,61.27,150.99,298.15,95,437-11.32,28.06-32.8,56.33-55,74q-10.005,6.495-20,13l-33,75c-33.83,66.71-90.24,152.08-146,197-90.54,72.94-192.85,123.7-317,165-52.62,17.51-109.58,25.12-164,41-69.51,20.28-146.77,17.1-223,30-65.63,11.11-138.99,9.99-213,10h-85c-74.09-11.94-149.34-3.63-219-18q-73.995-13.005-148-26c-180.6-45.23-392.38-115.66-491-240-35.215-44.4-68.4-89.41-98-140q-17.5-34.995-35-70-4-11.505-8-23l-25-18c-27.761-25.87-47.953-57.23-60-99-11.568-40.11-11.206-112.19-3-156,20.871-111.43,44.333-205.85,119-262a328.714,328.714,0,0,1,69-40q18-5.505,36-11,25-24.495,50-49c55.131-43.33,113.612-79.11,177-115,16.508-9.35,35.246-24.32,55-29l-3-3-48-61c-31.539-45.43-57.116-93.7-73-155-26.068-100.592-9.206-245.568,20-328,81.572-230.233,224.9-381.89,446-472,58.26-23.742,123.27-33.082,191-48Zm6,11-99,8c-64.68,12.342-125.13,23.354-181,44C876.268,378.78,723.114,542.019,648,778c-28.99,91.075-39.8,242.33-7,338,26.782,78.12,74.527,130.79,119,190-1,2.67-2,5.33-3,8q-24.5,13.005-49,26c-66.283,36.29-127.873,73.16-185,118-18.7,14.68-33.069,37.5-52,51l-37,12c-26.356,10.42-52.133,26.41-73,43-74.367,59.14-149.862,270.32-105,412,9.438,29.81,28.834,63.19,51,81q15.5,12,31,24,15,34.5,30,69c32.272,61.22,71.677,114.27,113,166,43.7,54.71,113.061,95.94,180,127,80.227,37.22,165.952,68.8,260,95,51.741,14.41,107.39,18.73,161,32l57,6c48.33,9.08,105.18,10.11,157,15q70.5,0.495,141,1,31.5-1.005,63-2,30.495-1.005,61-2c50.06-8.35,101.59-6.19,147-16q39-4.995,78-10c61.75-13.99,123.44-23.11,182-40,262.3-75.65,422.18-189.48,522-428,7.55-18.04,20.04-23.81,34-35,19.6-15.71,36.24-41.81,47-66,39.79-89.48,8.15-254.77-26-327-28.4-60.08-65.36-104.24-123-135-17.63-9.41-38.39-10.14-57-20q-18-18.495-36-37-33-25.995-66-52-57.99-36-116-72c-24-13.27-51.21-23.22-73-39v-7c22.67-17.5,38.37-46.35,55-70,32.35-45.99,59.58-94.28,74-159,27.17-121.973-.84-269.082-39-359C2040.36,424.634,1795.05,242.725,1383,243Z"
        />
        <path
          id="색상_칠_10"
          data-name="색상 칠 10"
          fill="#fff"
          fillRule="evenodd"
          d="M1924,772c24.84,0.952,44.08,42.819,19,54C1913.04,835.024,1897.49,787.661,1924,772Z"
        />
        <path
          id="색상_칠_9"
          data-name="색상 칠 9"
          fill="#fff"
          fillRule="evenodd"
          d="M903,766c42.185-2.232,23.739,62.936-14,52C872.316,796.091,885.276,778.41,903,766Z"
        />
      </svg>
    </>
  );
};

export default Character;