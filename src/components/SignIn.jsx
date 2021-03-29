import React from 'react';

export default function SignIn({
  onChange, onSubmit, onClick, fields, loginError,
}) {
  const { email, password } = fields;

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    onChange({ name, value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
  }

  return (
    <>
      <section>
        <h1>Room Preview 🏠</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {loginError && <p>{loginError}</p>}
          <button type="submit">방보러 가볼까요? 👉🏻</button>
        </form>
        <button type="button" onClick={onClick}>로그인 없이 구경하기 👀</button>
      </section>
    </>
  );
}
