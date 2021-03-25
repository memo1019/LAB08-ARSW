package edu.eci.arsw.collabpaint;

import edu.eci.arsw.collabpaint.model.Point;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CollabPaintController {

    @MessageMapping("/hello")
    @SendTo("/topic/newpoint")
    public Point pointing(Point point) throws Exception {
        return point;
    }
}
