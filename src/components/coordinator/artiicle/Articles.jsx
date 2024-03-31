import { Input} from 'reactstrap'
function Articles() {
  return (
    <div>
      <h1>Articles</h1>
      <Input type="select" width={'18%'}>
        <option>Article 1</option>
        <option>Article 2</option>
        <option>Article 3</option>
        <option>Article 4</option>
        <option>Article 5</option>
        <option>Article 6</option>
        <option>Article 7</option>
        <option>Article 8</option>
        <option>Article 9</option>
        <option>Article 10</option>
        <option>Article 11</option>
        <option>Article 12</option>
        <option>Article 13</option>
        <option>Article 14</option>
        <option>Article 15</option>
        <option>Article 16</option>
        <option>Article 17</option>
        <option>Article 18</option>
      </Input>
      <div className="ungraded-articles">
        <h2>Ungraded articles</h2>
      </div>
      <div className="graded-articles">
        <h2>Graded articles</h2>
      </div>
    </div>
  )
}

export default Articles